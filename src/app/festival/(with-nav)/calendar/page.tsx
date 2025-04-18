"use client";

import { getDaysForMonth, getDate } from "@/utils/dateUtils";
import clsx from "clsx";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { FestivalResponse } from "@/types/festival";
import getFestivals from "../../_services/getFestivals";

const days = ["일", "월", "화", "수", "목", "금", "토"];

export default function FestivalCalendar() {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0); // 현재 표시 중인 달의 인덱스
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // 선택된 날짜
  const [selectedFestival, setSelectedFestival] = useState<any | null>(null); // 선택된 축제
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const { data, isLoading, error } = useQuery<FestivalResponse>({
    queryKey: ["festivals"],
    queryFn: getFestivals,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;

  const today = new Date();
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
    return { year: date.getFullYear(), month: date.getMonth() + 1 };
  });

  const { year, month } = months[currentMonthIndex];
  const allDays = getDaysForMonth(year, month);
  const weeks = [];
  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7));
  }

  const items = data?.response.body.items.item.filter((festival) => festival.eventenddate > getDate());
  const sortedItems = items?.sort((a, b) => Number(a.eventstartdate) - Number(b.eventstartdate));

  const handleDateClick = (dayStr: string) => {
    const formattedDate = `${year}/${String(month).padStart(2, "0")}/${String(dayStr).padStart(2, "0")}`;
    setSelectedDate(formattedDate);
  };

  const handleImageClick = (festival: any) => {
    setSelectedFestival(festival);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFestival(null);
  };

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700">축제 달력</h1>
        <h2 className="text-xl font-semibold text-gray-700">{year}년 {month}월</h2>
      </div>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentMonthIndex((prev) => Math.max(prev - 1, 0))}
          disabled={currentMonthIndex === 0}
          className="px-4 py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 transition"
        >
          ← 이전 달
        </button>
        <button
          onClick={() => setCurrentMonthIndex((prev) => Math.min(prev + 1, months.length - 1))}
          disabled={currentMonthIndex === months.length - 1}
          className="px-4 py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 transition"
        >
          다음 달 →
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-700">
        {days.map((day, idx) => (
          <div key={idx} className={clsx("py-2", idx === 0 && "text-red-500", idx === 6 && "text-blue-500")}>
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {weeks.map((week, weekIdx) =>
          week.map((day, i) => {
            const isEmpty = !day;
            const dayStr = `${String(day).padStart(2, "0")}`;
            const count = isEmpty
              ? 0
              : sortedItems?.filter((item) => item.eventstartdate <= `${year}${String(month).padStart(2, "0")}${dayStr}` && `${year}${String(month).padStart(2, "0")}${dayStr}` <= item.eventenddate).length || 0;

            return (
              <div
                key={`${year}-${month}-${weekIdx}-${i}`}
                onClick={() => !isEmpty && handleDateClick(dayStr)}
                className={clsx(
                  "aspect-square flex flex-col items-center justify-center rounded-lg border",
                  isEmpty
                    ? "bg-transparent border-transparent"
                    : "bg-white border-gray-300 hover:bg-purple-100 hover:border-purple-500 cursor-pointer",
                  selectedDate === `${year}/${String(month).padStart(2, "0")}/${dayStr}` && "ring-2 ring-purple-500"
                )}
              >
                {!isEmpty && (
                  <>
                    <span className="text-lg font-bold">{day}</span>
                    {count > 0 && <span className="text-sm text-purple-500">{count}개</span>}
                  </>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* 축제 리스트 */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedDate ? `${selectedDate}의 축제 리스트` : "전체 축제 리스트"}</h2>
        <div className="grid grid-cols-3 gap-6">
          {sortedItems
            ?.filter((item) => !selectedDate || (item.eventstartdate <= selectedDate.replace(/\//g, "") && selectedDate.replace(/\//g, "") <= item.eventenddate))
            .map((item) => (
              <div
                key={item.contentid}
                className="p-4 bg-gray-100 border rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <img
                  src={item.firstimage || "/placeholder.jpg"}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-md mb-4 cursor-pointer"
                  onClick={() => handleImageClick(item)}
                />
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">기간: {item.eventstartdate} ~ {item.eventenddate}</p>
                <p className="text-sm text-gray-600">장소: {item.addr1 || "정보 없음"}</p>
              </div>
            ))}
          {sortedItems?.filter((item) => !selectedDate || (item.eventstartdate <= selectedDate.replace(/\//g, "") && selectedDate.replace(/\//g, "") <= item.eventenddate))
            .length === 0 && (
            <p className="text-gray-500 text-center col-span-3">해당 날짜에 행사가 없습니다.</p>
          )}
        </div>
      </div>

      {/* 상세보기 모달 */}
      <AnimatePresence>
        {isModalOpen && selectedFestival && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-purple-700">{selectedFestival.title}</h2>
                <button onClick={closeModal} className="text-black-500 hover:text-black-700">
                  나가기
                </button>
              </div>
              <img
                src={selectedFestival.firstimage || "/placeholder.jpg"}
                alt={selectedFestival.title}
                className="w-full h-60 object-cover rounded-md mb-4"
              />
              <p className="text-sm text-gray-600 mb-2">기간: {selectedFestival.eventstartdate} ~ {selectedFestival.eventenddate}</p>
              <p className="text-sm text-gray-600 mb-2">장소: {selectedFestival.addr1 || "정보 없음"}</p>
              <p className="text-sm text-gray-600">{selectedFestival.overview || "축제에 대한 설명이 없습니다."}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}