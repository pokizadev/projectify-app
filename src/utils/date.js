class DateUtil {
    addMinutes(minutes, date) {
        const startDate = date || new Date();
        const unixDate = startDate.setMinutes(startDate.getMinutes() + minutes);

        return new Date(unixDate);
    }

    addHours(hours, date) {
        const startDate = date || new Date();
        const unixDate = startDate.setHours(startDate.getHours() + hours);

        return new Data(unixDate);
    }
}

export const date = new DateUtil();
