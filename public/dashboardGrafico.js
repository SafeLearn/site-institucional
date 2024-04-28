/*=============================*/
/*JANELAS DO NAVEGADORS*/

google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {

      var data = google.visualization.arrayToDataTable([
        ['Janelas', '% de acesso', {role: 'annotation'}],
        ['Google Chrome', 81, 'Google Chrome'],
        ['Youtube', 37, 'Youtube'],
        ['Teams', 26, 'Teams'],
        ['Moodle', 20, 'Moodle'],
        ['Totvs', 15, 'Totvs']
      ]);

      var options = {
        title: 'Janelas do navegador mais acessadas (Ultima semana)',
        chartArea: {width: '92%', height: '250px'},
        bar: {groupWidth : "95%",
        backgroundColor: 'silver'},
        hAxis: {
          title: 'Porcentagem de acessos',
          minValue: 0
        },
        vAxis: {
          title: 'Janelas'
        }
      };

      var chart = new google.visualization.BarChart(document.getElementById('chart'));

      chart.draw(data, options);
    }

/*=============================*/
/*GRÁFICO DE MEDIA DE USO DE COMPONENTES*/

google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawVisualization);

      function drawVisualization() {
        // Some raw data (not necessarily accurate)
        var data = google.visualization.arrayToDataTable([
          ['Dia da Semana', 'RAM', 'CPU', 'DISCO', 'Recomendado'],
          ['Segunda-Feira', 31.5, 25, 17.5, 50],
          ['Terça-Feira', 51.5, 25, 17.5, 50],
          ['Quarta-Feira', 80, 56, 15, 50],
          ['Quinta-Feira', 88.5, 23, 12.5, 50],
          ['Sexta-Feira', 10, 20, 10, 50]
        ]);

        var options = {
          title: 'Média de uso dos componentes por processo (%)',
          subtitle: '(em Porcentagem %)',
          vAxis: {title: 'Média de uso'},
          hAxis: {title: 'Dia da Semana'},
          seriesType: 'bars',
          height: 250,
          series: {3: {type: 'line'}}
        };

        var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }


      