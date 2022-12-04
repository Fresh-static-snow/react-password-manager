import { IWebsitePassword } from '../../models/websitePassword';

export interface DashBoardHeaderProps {
  setFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  refetch: () => void;
}
export interface PasswordItemProps {
  item: PasswordWithId;
  index: number;
  filter: string;
  removeHandler: () => void;
  refetch: () => void;
}
export type PasswordWithId = IWebsitePassword & { id: string };
