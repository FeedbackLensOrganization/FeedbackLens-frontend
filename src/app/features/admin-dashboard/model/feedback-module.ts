export interface Feedback {
  id: number;
  text: string;
  createdAt: string;
  sentiment: string;
  confidenceJson: Record<string, number>;
  keyPhrasesJson: string[];
}
