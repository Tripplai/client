export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Resume {
  id: number;
  title: string;
  content?: string;
  feedback?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateResumeRequest {
  title: string;
  content: string;
}

export interface UpdateResumeRequest {
  title?: string;
  content?: string;
} 