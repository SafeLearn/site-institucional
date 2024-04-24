google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            var data = google.visualization.arrayToDataTable([
            ['Mês', 'Máquinas'],
            ['Fevereiro', 2], ['Março', 5], ['Abril', 7], ['Maio', 10], ['Junho', 15]]);
        
          var options = {
            title: 'Tendência de perca de máquinas no decorrer dos meses',
            hAxis: {title: 'Mês'},
            vAxis: {title: 'Quantidade de máquinas'},
            legend: 'none',
            trendlines: { 0: {} } 
          };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
  chart.draw(data, options);
      }