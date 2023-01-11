(function(){
    let currentHour = function(){
        var fecha = new Date(),
            hour = fecha.getHours(),
            ampm,
            minutos = fecha.getMinutes(),
            segundos = fecha.getSeconds();

        if(hour >=12){
            hour = hour-12;
            ampm='PM'
        }else{
            ampm='AM'
        }

        if (hour==0) {
            hour=12;
        }
        
        if (minutos<10) { minutos = "0"+minutos };
        if (hour<10) { hour = "0"+hour };
        if (segundos<10) { segundos = "0"+segundos };

        /*set data*/
        document.getElementById('hour').textContent=hour;
        document.getElementById('time').textContent=ampm;
        document.getElementById('minute').textContent=minutos;
        document.getElementById('seconds').textContent=segundos;
    };

    currentHour();

    setInterval(currentHour,1000);
}())