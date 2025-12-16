import NeuralNetwork from "./NeuralNetwork";

export type Genome<T> = {
  brain: NeuralNetwork;
  fitness: number;
  data: T;
};

export default class GeneticAlgorithm<T = unknown> {
  populationSize: number;
  mutationRate: number;
  mutationStrength: number;

  population: Genome<T>[] = [];
  generation = 0;

  constructor(
    populationSize: number,
    mutationRate = 0.2,
    mutationStrength = 0.1
  ) {
    this.populationSize = populationSize;
    this.mutationRate = mutationRate;
    this.mutationStrength = mutationStrength;
  }

  init(inputNodes: number, hiddenNodes: number, outputNodes: number, createData: (brain: NeuralNetwork) => T) {
    this.population = [];

    for (let i = 0; i < this.populationSize; i++) {
      const brain = new NeuralNetwork(inputNodes, hiddenNodes, outputNodes);
      this.population.push({
        brain,
        fitness: 0,
        data: createData(brain),
      });
    }
  }

  evolve(createData: (brain: NeuralNetwork) => T) {
    
  }



  getBest(): Genome<T> {
    return this.population.reduce((best, g) =>
      g.fitness > best.fitness ? g : best
    );
  }
}
