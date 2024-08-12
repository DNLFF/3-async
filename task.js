class AlarmClock{
    constructor(){
        this.alarmCollection = [];
        this.timerId = null;
    }

    addClock(time,callback,idCall){
        if (!idCall){
            throw new Error('параметр id не был передан');
        }

        if (this.alarmCollection.some(element => element.idCall === idCall)){
            console.error('Звонок с таким id уже существует');
        }

        else{
        this.alarmCollection.push({idCall, time, callback});
        }
    }

    removeClock(idRemove){
        if (idRemove > this.alarmCollection.length){
            return false;
        }

        this.alarmCollection.splice(idRemove-1,1);
        return true;
        }

    getCurrentFormattedTime(){
        return new Date().toLocaleTimeString().slice(0,-3);
    }

    start(){
        const checkClock = (currCall) =>{
            if (currCall.time === this.getCurrentFormattedTime()){
                currCall.callback();
            }
        }
        
        if (!this.timerId){
            this.timerId = setInterval(()=>{
                this.alarmCollection.forEach(call => checkClock(call));
            },1000)
        }
    }

    stop(){
        if (this.timerId){
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    printAlarms(){
        console.log(`всего будильников: ${this.alarmCollection.length}`);
        this.alarmCollection.forEach(element => console.log(`Будильник №${element.idCall} заведён на ${element.time}`));
    }

    clearAlarms(){
        this.stop();
        this.alarmCollection = [];
    }
}

const clock = new AlarmClock();
clock.addClock("23:01",()=> console.log('обед'),1);
clock.addClock("23:02",()=> {console.log('обед потом'); clock.removeClock(2)},2);
clock.addClock("23:03",()=> {console.log('обед потом потом'); 
    clock.clearAlarms(); 
    clock.printAlarms()}
    ,3);
clock.printAlarms()
clock.start();
