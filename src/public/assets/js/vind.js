const apiUrl = 'https://api.bitycle.com/api/exchange/chart_data?symbol=USDTIRT&end=1735948800&source=nobitex_spot&time_frame=1d&is_first=true';

async function fetchChartData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const labels = data.map(item => new Date(item.date).toLocaleDateString());
    const values = data.map(item => item.value);

    renderChart(labels, values);
  } catch (error) {
    console.error('Error fetching chart data:', error);
  }
}

function renderChart(labels, data) {
  const ctx = document.getElementById('myChart').getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'USDT to IRT',
        data: data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Value (IRT)'
          }
        }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', fetchChartData);
