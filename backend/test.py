import numpy as np
from tupmap import tupMap

class AntColony:
    def __init__(self, graph, start_node, end_node, n_ants, n_iterations, pheromone_evaporation_rate=0.5, alpha=1, beta=2):
        self.graph = graph
        self.start_node = start_node
        self.end_node = end_node
        self.n_ants = n_ants
        self.n_iterations = n_iterations
        self.pheromone_evaporation_rate = pheromone_evaporation_rate
        self.alpha = alpha
        self.beta = beta
        self.n_nodes = len(graph)
        self.pheromone = np.ones((self.n_nodes, self.n_nodes))
        np.fill_diagonal(self.pheromone, 0)  # No pheromone on diagonal (no self loops)
        self.best_path = None
        self.best_path_length = np.inf

    def run(self):
        for _ in range(self.n_iterations):
            ant_paths, path_lengths = self.generate_ant_paths()
            self.update_pheromone(ant_paths, path_lengths)
            self.update_best_path(ant_paths, path_lengths)
        return self.best_path, self.best_path_length

    def generate_ant_paths(self):
        ant_paths = []
        path_lengths = []
        for ant in range(self.n_ants):
            visited = set()
            path = [self.start_node]  # Start at the specified start node
            visited.add(self.start_node)
            length = 0
            while path[-1] != self.end_node:
                next_node = self.choose_next_node(path[-1], visited)
                length += self.graph[path[-1], next_node]
                path.append(next_node)
                visited.add(next_node)
            ant_paths.append(path)
            path_lengths.append(length)
        return ant_paths, path_lengths

    def choose_next_node(self, current_node, visited):
        probabilities = self.calculate_probabilities(current_node, visited)
        next_node = np.random.choice(range(self.n_nodes), p=probabilities)
        return next_node

    def calculate_probabilities(self, current_node, visited):
        pheromone = self.pheromone[current_node] ** self.alpha
        heuristic = np.zeros_like(pheromone)
        heuristic[:] = 1e-6  # Set a small value to avoid division by zero
        heuristic[np.isfinite(self.graph[current_node])] = 1 / (self.graph[current_node, np.isfinite(self.graph[current_node])] + 1e-6) ** self.beta
        probabilities = pheromone * heuristic
        probabilities[list(visited)] = 0  # Mask out visited nodes
        probabilities /= np.sum(probabilities)
        return probabilities

    def update_pheromone(self, ant_paths, path_lengths):
        self.pheromone *= (1 - self.pheromone_evaporation_rate)  # Evaporation
        for path, length in zip(ant_paths, path_lengths):
            for i in range(len(path) - 1):  # Modified to iterate over path length
                self.pheromone[path[i], path[i+1]] += 1 / length

    def update_best_path(self, ant_paths, path_lengths):
        for path, length in zip(ant_paths, path_lengths):
            if length < self.best_path_length:
                self.best_path = path
                self.best_path_length = length

# Example usage:
if __name__ == "__main__":
    # Example graph represented as an adjacency matrix (weights between nodes)
    graph = tupMap
    
    # Define start and end nodes
    start_node = 0
    end_node = 121
    
    # Initialize and run ACO
    aco = AntColony(graph, start_node, end_node, n_ants=10, n_iterations=100)
    best_path, best_path_length = aco.run()
    print("Best path:", best_path)
    print("Best path length:", best_path_length)
