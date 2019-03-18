'use strict';

	var regstring  = '';
	var alphalist = 'bcdfghijkmnopqrstuvwxyzDEFGHIJKLMOPQRSTUVWXYZ';
	var eoclist = 'BAlaNCe'

	console.log("budget.js exists.");
	function startProgram()
	{
		console.log("startProgram works.");
		document.getElementById('calc').onclick = calc;		//Whenever you click the id 'calc' button, call the calc function.
		document.getElementById('clear').onclick = clear;
		document.getElementById('download').onclick = download;
		
		var tab = document.getElementById('fields');
		var list = tab.getElementsByTagName('INPUT');
		var dropdown = tab.getElementsByTagName('SELECT');
			
			for (var i=0 ; i<list.length ; i++)
			{
				list[i].addEventListener('change',autoCalc);
			}
			for (var i=0; i<dropdown.length; i++)
			{
				dropdown[i].addEventListener('change',autoCalc);
			}
			
		clear();
		
			var fileInput = document.getElementById('fileInput');
					//var fileDisplayArea = document.getElementById('fileDisplayArea');

					fileInput.addEventListener('change', function(e) 
					{
						var file = fileInput.files[0];
						//var textType = /text.*/;
						var counter = 0;
						var flag = 0;
						regstring = '';
						
						//if (file.type.match(textType)) 
						//{
							var reader = new FileReader();

							reader.onload = function(e) {
								console.log(reader.result);
								document.getElementById('filename').value = file.name;
								document.getElementById('filename').value = document.getElementById('filename').value.substring(0,document.getElementById('filename').value.length - 4)
								
								//Decryption Code Begins Here
								console.log ('Decrypter first receives the following:'+ reader.result);
								for (var a = 0 ; a < reader.result.length; a++)
								{
									for (var b = 0; b < eoclist.length; b++)
									{
										if (reader.result.substring(a,a+1) == eoclist.substring(b,b+1))
										{
											regstring += String.fromCharCode(counter);
											flag = 1;
											break;
										}
										
									}
									if (flag == 0){counter++;} else {counter = 0; flag = 0;}
								}
								
								
								
								//Decryption Code Ends Here
								
								//document.box.loadstuff.value = regstring;
								load();
								//fileDisplayArea.innerText = reader.result;
							}

							reader.readAsText(file);    
						//} else {
							//document.box.loadstuff.value = "File not supported!"
						//}
					});

	}
	
	function clear()
	{		
			console.log("Clearing...");

		var tab = document.getElementById('fields');
		var list = tab.getElementsByTagName('INPUT');
		var dropdown = tab.getElementsByTagName('SELECT');
		
		
		for (var a = 0; a <= 3; a++)
		{
			dropdown[a].value = "Year";
			list[a*2] = '';
			list[a*2+1] = 0;
		}

		for (var a = 4; a <= 15; a++)
		{
			dropdown[a].value = "Dollars";
		}
		
		for (var a = 0; a <= 11; a++)
		{
			list[a*4+6].value = '';
			list[a*4+7].value = 0;
			list[a*4+8].value = 1;
			list[a*4+9].checked = false;
		}	
	}
	
	function autoCalc()
		{
			console.log("Change detected.")
			if (document.getElementById('autocalc').checked)
			{
				calc();
			}	
		}

	function load()
	{
				console.log("Loading...");

	var i_description = ['','',''];
	var i_amount = [0,0,0];
	var i_frequency = [0,0,0];
	var i_total = 0;
	
	var b_type;
	var f_amounts = [1,4,12,24,26,52,360];
	
	var e_description = ['','','','','','','','','','','',''];
	var e_rate = [0,0,0,0,0,0,0,0,0,0,0,0];
	var e_mode = [0,0,0,0,0,0,0,0,0,0,0,0];
	var e_round = [0,0,0,0,0,0,0,0,0,0,0,0];
	var e_amount = [0,0,0,0,0,0,0,0,0,0,0,0];
	var e_cash = [0,0,0,0,0,0,0,0,0,0,0,0];
	var e_total = 0;
	var e_cashtotal = 0;
	
	var n_income = 0;
	
	var r_number = 0;
	var bigtext = '';
	var counter = 0;
	var testchar = '';
	
	var stuff = ['','','','','','','','','','',
				 '','','','','','','','','','',
				 '','','','','','','','','','',
				 '','','','','','','','','','',
				 '','','','','','','','','','',
				 '','','','','','','','','','',
				 '','','','','','','','',''];
	var table = document.getElementsByTagName('TABLE')[0]; 
	var list = table.getElementsByTagName('INPUT');		
	
	var dropdown = table.getElementsByTagName('SELECT');
		
		document.getElementById('fields').focus();
		
	   

		
		
		
		
		
		//console.log(list.value);
		//console.log(list.value.substring(0,1));
		console.log('Regstring is ' + regstring);
		for (var a = 0;a <= 80;a++)
		{
			bigtext =  '';
			do
			{
				
				
				testchar = regstring.substring(counter,counter + 1);
				console.log(a + ": testchar is " + testchar + ", counter is "+ counter);
				if (testchar == '*')
				{
					counter++;
					stuff[a] = bigtext;
					break;
				}
				else
				{					
					bigtext += testchar;
				}
				counter++;
				if (counter > 999)
				{
					console.log("Error at field " + a);
					break;
				}
				
				//if (counter > 99) {break;}
			}
			while (a != 100);

			
			console.log(a+ "  "+ stuff[a]);


		}

		if (stuff[0] == 1) {dropdown[0].value = 'Year';}
		if (stuff[0] == 4) {dropdown[0].value = 'Quarter';}
		if (stuff[0] == 12) {dropdown[0].value = 'Month';}
		if (stuff[0] == 24) {dropdown[0].value = 'Half-Month';}
		if (stuff[0] == 26) {dropdown[0].value = 'Fortnight';}
		if (stuff[0] == 52) {dropdown[0].value = 'Week';}
		if (stuff[0] == 360) {dropdown[0].value = 'Day';}
		
		
				
		for (var a = 0; a <= 2; a++)
		{
			list[a*2+0].value = stuff[a*3+1];		//Income Description
			list[a*2+1].value = stuff[a*3+2];		//Income Amount
			if (stuff[a*3+3] == 1) {dropdown[a+1].value = 'Year';}
			if (stuff[a*3+3] == 4) {dropdown[a+1].value = 'Quarter';}
			if (stuff[a*3+3] == 12) {dropdown[a+1].value = 'Month';}
			if (stuff[a*3+3] == 24) {dropdown[a+1].value = 'Half-Month';}
			if (stuff[a*3+3] == 26) {dropdown[a+1].value = 'Fortnight';}
			if (stuff[a*3+3] == 52) {dropdown[a+1].value = 'Week';}
			if (stuff[a*3+3] == 360) {dropdown[a+1].value = 'Day';}
		}
		
		for (var a = 0; a <= 11; a++)
		{
			list[a*4+6].value = stuff[a*5+10];		//Expense Description   
			list[a*4+7].value = stuff[a*5+11];		//Expense Amount
			if (stuff[a*5+12] == 0) {dropdown[a+4].value = 'Dollars';}
			if (stuff[a*5+12] == 1) {dropdown[a+4].value = 'Percent';}
			list[a*4+8].value = stuff[a*5+13];		//Expense Mode Amount
			
			if (stuff[a*5+14] == 1){ list[a*4+9].checked = true;} else {list[a*4+9].checked = false;}
		}
		changecash();
		calc();
		
	}	

	function changecash()
	{
		console.log("Changing Cash Value...");

		var table = document.getElementsByTagName('TABLE')[0]; 
		var list = table.getElementsByTagName('INPUT');
		var rows = table.getElementsByTagName('TD');	
		//var default_color = document.getElementById('curColor').innerHTML;
		
		for (var a = 0; a <= 11; a++)
		{
			if (list[a*4+9].checked)
			{
				for (var b = 9; b <= 12; b++) { rows[a*4+b].style.backgroundColor="green"; }
			
			}
			else
			{
				for (var b = 9; b <= 12; b++) 
				{
					rows[a*4+b].style.backgroundColor="#000080";
				
				}
			}
		}
		
	}
	
	function calc()
	{
		console.log("Calculating...");
		var i_description = ['','',''];
		var i_amount = [0,0,0];
		var i_frequency = [0,0,0];
		var i_total = 0;
		
		var b_type;
		var f_amounts = [1,4,12,24,26,52,360];
		
		var e_description = ['','','','','','','','','','','',''];
		var e_rate = [0,0,0,0,0,0,0,0,0,0,0,0];
		var e_mode = [0,0,0,0,0,0,0,0,0,0,0,0];
		var e_round = [0,0,0,0,0,0,0,0,0,0,0,0];
		var e_amount = [0,0,0,0,0,0,0,0,0,0,0,0];
		var e_cash = [0,0,0,0,0,0,0,0,0,0,0,0];
		var e_total = 0;
		var e_cashtotal = 0;

		var n_income = 0;
		
		var r_number = 0;
		
		var table = document.getElementsByTagName('TABLE')[0]; 
		var list = table.getElementsByTagName('INPUT');		
		
		
		var dropdown = table.getElementsByTagName('SELECT');
			console.log("Budget Type: " + dropdown[0].value);
			console.log("Income 1 Frequency: "+dropdown[1].value);
			console.log("Income 2 Frequency: "+dropdown[2].value);
			console.log("Income 3 Frequency: "+dropdown[3].value);
		for (var a = 1; a <= 3; a++)
		{
			if (dropdown[a].value == "Year") { i_frequency[a-1] = 1; }
			if (dropdown[a].value == "Quarter") { i_frequency[a-1] = 4; }
			if (dropdown[a].value == "Month") { i_frequency[a-1] = 12; }
			if (dropdown[a].value == "Half-Month") { i_frequency[a-1] = 24; }
			if (dropdown[a].value == "Fortnight") { i_frequency[a-1] = 26; }
			if (dropdown[a].value == "Week") { i_frequency[a-1] = 52; }
			if (dropdown[a].value == "Day") { i_frequency[a-1] = 360; }
			console.log("Income "+ a+ " Frequency: " + i_frequency[a-1]);
		}
			
		
			if (dropdown[0].value == "Year") { b_type = 1; }
			if (dropdown[0].value == "Quarter") { b_type = 4; }
			if (dropdown[0].value == "Month") { b_type = 12; }
			if (dropdown[0].value == "Half-Month") { b_type = 24; }
			if (dropdown[0].value == "Fortnight") { b_type = 26; }
			if (dropdown[0].value == "Week") { b_type = 52; }
			if (dropdown[0].value == "Day") { b_type = 360; }
			console.log("Budget Type Number: "+ b_type);

		for (var a=0; a<= 2; a++)
		{
			i_description[a] = list[a*2+0].value;
			i_amount[a] = Number(list[a*2+1].value);
			console.log(i_description[a] + "'s Income: "+ i_amount[a].toFixed(2));
		}
			
		for (var a=0;a <= 2; a++)
		{
			i_total += (i_amount[a] * i_frequency[a]);
			console.log('Total Income: '+i_total);
		}
		i_total = i_total / b_type;
		
		document.getElementById('totalincome').innerHTML = "Total Income: $" + i_total.toFixed(2);

			//console.log(list[8].value);
		
		
		for (var a = 0;a<= 11;a++)
		{
			e_description[a] = list[a*4+6].value;
			console.log ('Description #'+a + ' is '+e_description[a]);
			if (Number(list[(a*4)+8].value) <= 0)  //Rounding number
			{ 
				list[(a*4)+8].value = '1';
			}
			e_round[a] = Number(list[a*4+8].value);
	
			if (e_round[a] <= 0) 
			{
				e_round[a] = 1;
			}
			console.log("In Text Box #"+ (a*4+7)+ ": "+ list[a*4+7].value);
			console.log("Dropdown ["+(a+4)+"] :"+dropdown[a+4].value);
			e_rate[a] = Number(list[a*4+7].value);
			//if (list[a*3+7].value == '') {e_rate[a] = 0;}
			
			if (dropdown[a+4].value == "Dollars") 
			{ 
				e_amount[a] = Number(list[a*4+7].value);
				e_mode[a] = 0;
			}
			else 
			{
				r_number = i_total * (Number(list[a*4+7].value)/100);
			
				r_number = (r_number / e_round[a]).toFixed(0);
				r_number = r_number * e_round[a];
				e_amount[a] = r_number;
				e_mode[a] = 1;
			}
			console.log("Expense #"+ a+ ": "+e_amount[a]);
			
			
			if (list[a*4+9].checked)
				{
					e_cash[a] = 1;
				}
				else
				{
					e_cash[a] = 0;
				}
			console.log("Checkbox #"+a+ 'value: '+ list[a*4+9].checked);
			
			e_total += e_amount[a];
			if (e_cash[a] == 1) {e_cashtotal += e_amount[a];}
			
			
			console.log("Running Total: "+e_total);
			console.log("Running Cash Total: "+e_cashtotal);

		}
		document.getElementById('totalexpenses').innerHTML = "Total Expenses: $" + e_total.toFixed(2);
		

		n_income = i_total - e_total;
		console.log("Net Income: "+n_income);
		
		document.getElementById("netincome").innerHTML = 'Net Income: $' + n_income.toFixed(2);
		document.getElementById('cashout').innerHTML = 'Amount To Cash Out: $' + e_cashtotal.toFixed(2);
		
		regstring = '';
		
		//regstring += '1';
		
		regstring += b_type + "*"; //Budget Type
		
		
		for (var a = 0; a <= 2; a++)
		{
			regstring += i_description[a] + "*";
			regstring += i_amount[a] + "*";
			regstring += i_frequency[a] + "*";
		}
		for (var a = 0; a <= 11; a++)
		{
			
			regstring += e_description[a] + "*";
			regstring += e_rate[a] + "*";
			regstring += e_mode[a] + "*";
			regstring += e_round[a] + "*";
			regstring += e_cash[a] + "*";
			//regstring += e_amount[a] + "*";
		}
		console.log(regstring);
	}
	
	
	function download()
	{
		var table = document.getElementsByTagName('TABLE')[0]; 
		var list = table.getElementsByTagName('INPUT');		
		var dropdown = table.getElementsByTagName('SELECT');
		var cryptostring = '';
		var c = 0;
			for (var a = 0; a < regstring.length; a++)
			{
				for (var b = 0; b < regstring.charCodeAt(a); b++)
				{
					c = parseInt(Math.random()*alphalist.length);
					cryptostring += alphalist.substring(c,c+1);
				}
				c = parseInt(Math.random()*eoclist.length);
				cryptostring += eoclist.substring(c,c+1);
				
			}
			
			console.log(cryptostring);		
		
		var element = document.createElement('a');
			  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(cryptostring));
			  element.setAttribute('download', list[58].value + ".bud");

			  element.style.display = 'none';
			  document.body.appendChild(element);

			  element.click();

			  document.body.removeChild(element);
	}
  