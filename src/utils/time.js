import moment from "moment";
// 格式化时间
export const time2format = (date, fmt = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(date).format(fmt);
};
