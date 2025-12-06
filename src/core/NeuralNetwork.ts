export default class NeuralNetwork {
  inputNodes: number;
  hiddenNodes: number;
  outputNodes: number;

  weightsIH: number[][];
  weightsHO: number[][];
  biasH: number[];
  biasO: number[];

  public static readonly empty = new NeuralNetwork(1, 1, 1);

  constructor(inputNodes:number, hiddenNodes:number, outputNodes: number) {
    // number of nodes there are
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;

    this.weightsIH = NeuralNetwork.randomMatrix(hiddenNodes, inputNodes);
    this.weightsHO = NeuralNetwork.randomMatrix(outputNodes, hiddenNodes);
    this.biasH = NeuralNetwork.randomArray(hiddenNodes);
    this.biasO = NeuralNetwork.randomArray(outputNodes);
  }

  static randomMatrix(rows:number, cols:number):number[][] {
    let arr:number[][] = [];
    for(let i = 0; i < rows; i++) {
      arr.push(NeuralNetwork.randomArray(cols));
    }
    return arr;
  }

  static randomArray(size:number):number[] {
    let arr:number[] =[];
    for (let i = 0; i < size; i++) arr.push(Math.random() * 2 - 1);
    return arr;
  }

  static sigmoid(x:number):number {
    return 1/(1+Math.exp(-x));
  }

  predict(inputs:number[]):number[] {
    const hidden = this.weightsIH.map((row, i) => NeuralNetwork.sigmoid(
      row.reduce((sum, w, j) => sum+w*inputs[j], this.biasH[i])
    ));

    const outputs = this.weightsHO.map((row, i) => NeuralNetwork.sigmoid(
      row.reduce((sum, w, j) => sum+w*hidden[j], this.biasO[i])
    ));


    return outputs;
  }

  // rate: how often a mutation happens 0<n<1
  // strength: The largest amount a value can mutate -str<n<str
  mutate(rate:number=0.2, strength:number=0.1) {
    const mutateValue = (val:number) => Math.random() < rate ? val+Math.random()*2*strength-strength: val;

    this.weightsIH = this.weightsIH.map(row => row.map(mutateValue));
    this.weightsHO = this.weightsHO.map(row => row.map(mutateValue));
    this.biasH = this.biasH.map(mutateValue);
    this.biasO = this.biasO.map(mutateValue);
  }

  copy(): NeuralNetwork {
    const nn = new NeuralNetwork(this.inputNodes, this.hiddenNodes, this.outputNodes);

    nn.weightsIH = this.weightsIH.map(row => [...row]);
    nn.weightsHO = this.weightsHO.map(row => [...row]);
    nn.biasH = [...this.biasH];
    nn.biasO = [...this.biasO];

    return nn;
  }
};