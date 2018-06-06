export interface IUiState {
  actionOngoing: boolean;
  isSelected: boolean;
  message: string;
}

export const initialUiState: IUiState = {
  actionOngoing: false,
  isSelected: false,
  message: ''
};
