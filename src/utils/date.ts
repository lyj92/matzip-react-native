/**
 * 날짜 구하는 함수
 * @param dateString
 * @returns
 */
function getDateDetils(dateString: string | Date) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return { year, month, day };
}

/**
 * 날짜 포맷 함수
 * @param dateString 날짜 데이터
 * @param separater 분리 구분자
 * @returns
 */
function getDateWithSeparater(
  dateString: string | Date,
  separater: string = ""
) {
  const { year, month, day } = getDateDetils(dateString);
  return [
    year,
    String(month).padStart(2, "0"),
    String(day).padStart(2, "0"),
  ].join(separater);
}

export { getDateWithSeparater };
