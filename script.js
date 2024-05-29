document.getElementById('trainForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const epochs = parseInt(document.getElementById('epochs').value);

    const trainingData = [
        { input: [0, 0], output: 0 },
        { input: [0, 1], output: 0 },
        { input: [1, 0], output: 0 },
        { input: [1, 1], output: 1 }
    ];

    trainPerceptron(epochs, trainingData);
});

document.getElementById('reset').addEventListener('click', function() {
    document.getElementById('trainForm').reset();
    document.getElementById('results').innerHTML = '';
    document.getElementById('evaluationResult').innerHTML = '';
});

/* Gneracion de numeros aleatorios para los Pesos*/
let weights = [Math.random(), Math.random()];
let bias = Math.random();
const learningRate = 0.1;

function stepFunction(x) {
    return x >= 1 ? 1 : 0;
}

/* Funcion de entrenamiento*/
async function trainPerceptron(epochs, trainingData) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    for (let epoch = 1; epoch <= epochs; epoch++) {
        let epochData = `<h3>Época ${epoch}</h3><table><thead><tr><th>Entrena(x1)/Descansa(x2)</th><th>Pesos(w1,w2)</th><th>Factor de Aprendizaje(b)</th><th>Resultado</th><th>Salida</th><th>Error(es lo esperado?)</th></tr></thead><tbody>`;
        for (let {input, output: expectedOutput} of trainingData) {
            let weightedSum = input[0] * weights[0] + input[1] * weights[1] + bias;
            let output = stepFunction(weightedSum);
            let error = expectedOutput - output;

            epochData += `<tr>
                <td>${input}</td>
                <td>[${weights[0].toFixed(2)}, ${weights[1].toFixed(2)}]</td>
                <td>${bias.toFixed(2)}</td>
                <td>${weightedSum.toFixed(2)}</td>
                <td>${output}</td>
                <td>${error}</td>
            </tr>`;

            weights[0] += learningRate * error * input[0];
            weights[1] += learningRate * error * input[1];
            bias += learningRate * error;
        }
        epochData += '</tbody></table>';
        resultsDiv.innerHTML += epochData;
        await new Promise(resolve => setTimeout(resolve, 500)); // Esperar para visualizar cada época
    }

    interpretResults();
}

function interpretResults() {
    const resultsDiv = document.getElementById('evaluationResult');
    resultsDiv.innerHTML = `
        <h2>Interpretación de Resultados</h2>
        <p>Para que el atleta tenga éxito (gane), necesita:</p>
        <ul>
            <li>Suficientes horas de entrenamiento: al menos 1 (representado como 1 en el modelo)</li>
            <li>Suficientes horas de descanso: al menos 1 (representado como 1 en el modelo)</li>
        </ul>
    `;
}
