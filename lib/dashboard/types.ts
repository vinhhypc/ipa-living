/** Một lượt gửi form (đã giải mã từ log DRM). */
export type Submission = {
  /** recordId từ DRM (dùng làm key). */
  id: string;
  /** status của log: 1 = match/thành công. */
  status?: number;
  /** giá trị các field + `createdTime` (đã format). */
  values: Record<string, string | boolean>;
};

export type SubmissionResult =
  | { ok: true; rows: Submission[] }
  | { ok: false; error: string; rows: Submission[] };
