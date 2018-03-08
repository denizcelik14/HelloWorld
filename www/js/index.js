/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
  
  

function processEvent(event) {
   
 document.getElementById("test").innerHTML+='Acceleration X: ' + Math.round(event.accelerationIncludingGravity.x);
	
	
	
}

window.addEventListener("devicemotion",processEvent, true);

    document.addEventListener("deviceready", onDeviceReady, false);
    // PhoneGap is ready
    function onDeviceReady() {
		document.getElementById("test2").innerHTML+="onDeviceready OK<br>";
		
		window.addEventListener("compassneedscalibration",function(event) {
      // ask user to wave device in a figure-eight motion .   
      event.preventDefault();
     }, true);
	 
}

	
	
	
	
	
	
	
	
 
