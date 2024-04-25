google.charts.load('current', {'packages':['corechart', 'line']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

          var data = new google.visualization.DataTable();
            data.addColumn('string', 'X');
            data.addColumn('number', 'Máquinas');

            data.addRows([['Fevereiro', 2], ['Março', 5], ['Abril', 7], ['Maio', 10], ['Junho', 15]]);
        
          var options = {
            chart: {
              title: 'Tendência de perca de máquinas (Proximos meses)',
              subtitle: 'De acordo com os ultimos meses',
              
            },
            hAxis: {
              title: 'Mês',
              titleTextStyle: { 
                fontSize: '16',
                bold: 'true',
               }
            },
            vAxis: {
              title: 'Quantidade de máquinas',
              titleTextStyle: { 
                fontSize: '16',
                bold: 'true',
               }
            }
          };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.charts.Line(document.getElementById('linechart_material'));
        
        chart.draw(data, google.charts.Line.convertOptions(options));
      }