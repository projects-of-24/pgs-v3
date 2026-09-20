/**
 * Board stand-in ticket swatches (Figma V6).
 * Local to Track Progress — do not import Loopboard feature modules here.
 */

export const FTP_BOARD_ACCENTS = ["pink", "purple", "mint", "green", "black", "white"] as const;
export type FtpBoardAccent = (typeof FTP_BOARD_ACCENTS)[number];

export const FTP_BOARD_ACCENT_HEX: Record<FtpBoardAccent, string> = {
  pink: "#C340A1",
  purple: "#B57CFF",
  mint: "#93E396",
  green: "#009C70",
  black: "#000000",
  white: "#FFFFFF"
};
