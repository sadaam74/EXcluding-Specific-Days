function calculateTotalTarget(startDate, endDate, totalAnnualTarget) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const daysExcludingFridays = [];
    const daysWorkedExcludingFridays = [];
    const monthlyTargets = [];
    
    
    function daysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }

   
    let currentDate = new Date(start);
    const endYear = end.getFullYear();
    const endMonth = end.getMonth();
    
    while (currentDate <= end) {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
       
        let totalDaysInMonth = daysInMonth(year, month + 1);
        let workDaysCount = 0;
        let monthWorkDaysCount = 0;

       
        for (let day = 1; day <= totalDaysInMonth; day++) {
            const date = new Date(year, month, day);
            if (date.getDay() !== 5) {
                workDaysCount++;
                if (date >= start && date <= end) {
                    monthWorkDaysCount++; 
                }
            }
        }

       
        daysExcludingFridays.push(workDaysCount);
        daysWorkedExcludingFridays.push(monthWorkDaysCount);
        
        
        if (workDaysCount > 0) {
            const monthlyTarget = (totalAnnualTarget / (daysExcludingFridays.reduce((a, b) => a + b, 0))) * monthWorkDaysCount;
            monthlyTargets.push(monthlyTarget);
        } else {
            monthlyTargets.push(0);
        }

        
        currentDate.setMonth(currentDate.getMonth() + 1);
    }

   
    const totalTarget = monthlyTargets.reduce((a, b) => a + b, 0);

    return {
        daysExcludingFridays,
        daysWorkedExcludingFridays,
        monthlyTargets,
        totalTarget
    };
}


console.log(calculateTotalTarget('2024-01-01', '2024-03-31', 5220));