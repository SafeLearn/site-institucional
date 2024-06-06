let proximaAtualizacao;

function JanelasComMaiorConsumo() {
  if (proximaAtualizacao != undefined) {
    clearTimeout(proximaAtualizacao);
  }

  fetch(`/processo/maioresProcessos/${sessionStorage.ID_INSTITUICAO}`)
    .then((resposta) => {
      if(resposta.ok){
        resposta.json().then((response) => {
          console.log(`Dados recebidos: ${JSON.stringify(response)}`);

          drawBasic(response);
        });
      }else{
        console.error("Nenhum dado encontrado ou erro na API");

        const card_grafico = document.getElementById("card_grafico");

        dadosNaoEncontrados(card_grafico);
      }
    })
    .catch((error) => {
      console.error(`Erro na obtenção de dados p/ gráfico: ${error.message}`);
    });
}
/*=============================*/

google.charts.load("current", { packages: ["corechart", "bar"] });
google.charts.setOnLoadCallback(initialize);

function initialize() {
  JanelasComMaiorConsumo();
}

function dadosNaoEncontrados(nomeElemento) {
    nomeElemento.innerHTML = `<div>
    <p>Nenhum dado encontrado!</p>
  </div>`;
}


/*JANELAS DO NAVEGADORS*/

function drawBasic(resposta) {
  console.log("Iniciando plotagem do grafico")
  console.log(resposta)

  var dataArray = [];
  dataArray.push(["Janelas", "% de acesso", { role: "annotation" }]);
  console.log(dataArray)
  resposta.forEach(item => {
    dataArray.push([item.nomeProcesso, item.consumoProcesso, item.nomeProcesso]);
  });

  var data = google.visualization.arrayToDataTable(dataArray);

  var options = {
    title: "Janelas do sistema com maior consumo (Ultima semana)",
    chartArea: { width: "92%", height: "250px" },
    bar: { groupWidth: "95%", backgroundColor: "silver" },
    hAxis: {
      title: "Quantidade de consumo",
      minValue: 0,
    },
    vAxis: {
      title: "Janelas",
    },
  };

  var chart = new google.visualization.BarChart(
    document.getElementById("chart")
  );

  chart.draw(data, options);
}

/*=============================*/
/*GRÁFICO DE MEDIA DE USO DE COMPONENTES*/

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawVisualization);

function drawVisualization() {
  // Some raw data (not necessarily accurate)
  var data = google.visualization.arrayToDataTable([
    ["Dia da Semana", "RAM", "CPU", "DISCO"],
    ["Segunda-Feira", 31.5, 25, 17.5],
    ["Terça-Feira", 51.5, 25, 17.5],
    ["Quarta-Feira", 80, 56, 15],
    ["Quinta-Feira", 88.5, 23, 12.5],
    ["Sexta-Feira", 10, 20, 10],
  ]);

  var options = {
    title: "Média de uso dos componentes por processo (%)",
    subtitle: "(em Porcentagem %)",
    vAxis: { title: "Média de uso" },
    hAxis: { title: "Dia da Semana" },
    seriesType: "bars",
    height: 250,
    series: { 3: { type: "line" } },
  };

  var chart = new google.visualization.ComboChart(
    document.getElementById("chart_div")
  );
  chart.draw(data, options);
}

JanelasComMaiorConsumo();