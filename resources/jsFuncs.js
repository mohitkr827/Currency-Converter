async function setup() {

    const ctx = document.getElementById('myChart').getContext('2d');
    
    let x = document.getElementById("Year").value;
    if(x==undefined)
    {
        x="2012";
    }

    let y = document.getElementById("curlist").value;
    if(y=="")
    {
        y="blk";
    }
    let  z= document.getElementById("period").value;
    if(z==undefined)
    {
        z="M";
    }

    console.log(x);
    console.log(y);
    console.log(z);
    
    const globalTemps = await getData(x,y,z);

    let chartStatus = Chart.getChart("myChart"); // <canvas> id
    if (chartStatus != undefined) {
    chartStatus.destroy();}

    let myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: globalTemps.years,
        datasets: [
          {
            label: 'Exchange Rate per US Dollar',
            data: globalTemps.temps,
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderWidth: 1
          }
        ]

      },
      options: {}
    });

  }

 
  async function getData(value,value2,value3){
    const currency=["USD","DZD","AUD","BWP","BRL","BND","CAD","CLP","CNY","CZK","DKK","EUR","INR","ILS","JPY","KRW","KWD","MYR","MUR","MXN","NZD","NOK","OMR","PEN","PHP","PLN","QAR","RUB","SAR","SGD","ZAR","SEK","CHF","THB","TTD","AED","GBP","UYU","COP","BHD","VEF","HUF","ISK","IDR","IRR","KZT","LYD","NPR","PKR","LKR","TND"]
    let x = value
    let y=value2
    let z=value3
    let i= currency.indexOf(y)+1;
    let text2 =x.concat(z,".csv")
    let text3="db/".concat(text2);
    const response = await fetch(text3);
    const data = await response.text();
    const years = [];
    const temps = [];
    const rows = data.split('\n').slice(1);
    rows.forEach(row => {
      const cols = row.split(',');
      years.push(cols[0]);
      temps.push(cols[i]);
    });
    return { years, temps };
  }

