function timers(){
	
	/*this.setStartCount(seconds,minutes,hours);
	this.synchronizeCounts();*/
	
	this.count= {
			seconds:0,
			minutes:0,
			hours:0
			};
	this.startCount=  {
			seconds:0,
			minutes:0,
			hours:0
			};
	this.countStr=" ";

	this.returnCountString=function(){
		return this.countStr;
	};
		
	
	this.synchronizeCounts=function(){ //Resets the timer values to their starting state
		this.count.seconds=this.startCount.seconds;
		this.count.minutes=this.startCount.minutes;
		this.count.hours=this.startCount.hours;
	};
	
	
	this.updateTimerCount = function(validateFields){ //updates the  string between the progress bar circle
		
		if(this .count.hours>0)
			this.countStr=this.count.hours+ " : ";
		else
			this.countStr=" ";

		if(this.count.minutes<10 && this.count.hours>0)
			this.countStr+= "0";
		if(this.count.minutes!=null)
		this.countStr+= this.count.minutes+ " : ";
			else if(this.count.hours>0) this.countStr+= "0 : ";
				
		
		
		if(this.count.seconds<10 && this.count.seconds>0)
			this.countStr+= "0";
		if(this.count.seconds!=null)
		this.countStr+= this.count.seconds;
			else if(this.count.hours>0 || this.count.minutes>0) this.countStr+= "00";
	};
	
	
	
	
	
		this.timerDecrease = function(){ //decreases the timer values accordingly
		if(this.count.seconds!=0)
			this.count.seconds--;
		else{
			 if(this.count.minutes!=0){
				this.count.seconds=59;
				this.count.minutes--;
			 }
			 else
				if(this.count.hours!=0){
					this.count.seconds=59;
					this.count.minutes=59;
					this.count.hours--;
				}	
		}

	};
	
	this.timerIncrease = function(){ //decreases the timer values accordingly
		if(this.count.seconds!=59)
			this.count.seconds++;
		else{
			 if(this.count.minutes!=59){
				this.count.seconds=0;
				this.count.minutes++;
			 }
			 else
				if(this.count.hours!=59){
					this.count.seconds=0;
					this.count.minutes=0;
					this.count.hours++;
				}
				
			
		}

	};
	
	
	
	
	
	
	
	return this;
}
	
	
	
	
/*	this.timer={
		count: {
			seconds:0,
			minutes:0,
			hours:0
		},
		startCount:  {
			seconds:0,
			minutes:0,
			hours:0
		},
		countStr:" ",
		status: false//Starting value for the timer	
	};*/