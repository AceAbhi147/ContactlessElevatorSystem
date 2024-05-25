const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

async function fetchDataAndProcess() {
    console.log("ehere")
    const response = await fetch('analytics.csv');
    const csvData = await response.text();

    // Parse CSV data
    const rows = csvData.split('\n').slice(1); // Remove header row
    const data = rows.filter(row => row.trim() !== '').map(row => row.replace('\r', '').split(','));

    // Process data (calculate metrics)
    const floorData = calculateFloorData(data);

    // Render chart
    renderPieChart(floorData["destFloorCounts"], "pieChartDestFloor", "Most Visted Floors");
    renderPieChart(floorData["srcFloorCounts"], "pieChartSrcFloor", "Most frequent Source Floors");
    renderBarChart(floorData["dataByDay"], "barChartDay", "Elevator Usage By Day")
    renderBarChart(floorData["dataByHour"], "barChartHour", "Elevator Usage By Hour")
}

// Function to calculate frequently visited and most frequent source floor
function calculateFloorData(data) {
    const destFloorCounts = {};
    const srcFloorCounts = {};
    const dataByDay = {};
    const dataByHour = {};
    for (const row of data) {
        const destinationFloor = "Floor " + row[2];
        const sourceFloor = "Floor " + row[1];
        destFloorCounts[destinationFloor] = (destFloorCounts[destinationFloor] || 0) + 1;
        srcFloorCounts[sourceFloor] = (srcFloorCounts[sourceFloor] || 0) + 1;
        
        const dayAndHour = calculateRange(row);
        dataByDay[dayAndHour["day"]] = (dataByDay[dayAndHour["day"]] || 0) + 1;
        dataByHour[dayAndHour["hour"]] = (dataByHour[dayAndHour["hour"]] || 0) + 1;
    }
    return {
        "destFloorCounts": destFloorCounts,
        "srcFloorCounts": srcFloorCounts,
        "dataByDay": dataByDay,
        "dataByHour": dataByHour
    }
}

function calculateRange(row) {
    const date = new Date(row[0] / 1000);
    const hour = date.getHours();
    const dayOfWeek = days[date.getDay()];
    return {
        "day": dayOfWeek,
        "hour": hour
    };
}

// Function to render chart
 function renderPieChart(data, elementId, label) {
      const labels = Object.keys(data);
      const values = Object.values(data);
      
      const ctx = document.getElementById(elementId).getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'pie', // Set chart type to pie
        data: {
          labels: labels,
          datasets: [{
            label: label,
            data: values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
              // Add more colors as needed
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
              // Add more colors as needed
            ],
            borderWidth: 1
          }]
        },
        options: {
          // Add options as needed
        }
      });
    }

    function renderBarChart(data, elementId, label) {
        const labels = Object.keys(data);
        const values = Object.values(data);
    
        const ctx = document.getElementById(elementId).getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: values,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
// Call the fetchDataAndProcess function when the page loads
window.onload = fetchDataAndProcess;
