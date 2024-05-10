import numpy as np

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
            ant_paths = self.generate_ant_paths()
            self.update_pheromone(ant_paths)
            self.update_best_path(ant_paths)
        return self.best_path, self.best_path_length

    def generate_ant_paths(self):
        ant_paths = []
        for ant in range(self.n_ants):
            visited = set()
            path = [self.start_node]  # Start at the specified start node
            visited.add(self.start_node)
            while path[-1] != self.end_node:
                next_node = self.choose_next_node(path[-1], visited)
                path.append(next_node)
                visited.add(next_node)
            ant_paths.append(path)
        return ant_paths

    def choose_next_node(self, current_node, visited):
        probabilities = self.calculate_probabilities(current_node, visited)
        next_node = np.random.choice(range(self.n_nodes), p=probabilities)  
        return next_node

    def calculate_probabilities(self, current_node, visited):
        pheromone = self.pheromone[current_node] ** self.alpha
        heuristic = 1 / (self.graph[current_node] + 1e-6) ** self.beta
        probabilities = pheromone * heuristic
        probabilities[list(visited)] = 0  # Mask out visited nodes
        probabilities /= np.sum(probabilities)
        return probabilities

    def update_pheromone(self, ant_paths):
        self.pheromone *= (1 - self.pheromone_evaporation_rate)  # Evaporation
        for path in ant_paths:
            path_length = sum([self.graph[path[i-1], path[i]] for i in range(1, len(path))])  # Modified to iterate over path
            for i in range(len(path) - 1):  # Modified to iterate over path length
                self.pheromone[path[i], path[i+1]] += 1 / path_length

    def update_best_path(self, ant_paths):
        for path in ant_paths:
            path_length = sum([self.graph[path[i-1], path[i]] for i in range(1, len(path))])  # Modified to iterate over path
            if path_length < self.best_path_length:
                self.best_path = path
                self.best_path_length = path_length

# Example usage:
if __name__ == "__main__":
    # Example graph represented as an adjacency matrix (weights between nodes)
    graph = np.array([[0, 2, 3, float('inf')],
                    [2, 0, float('inf'), 4],
                    [3, float('inf'), 0, 5],
                    [float('inf'), 4, 5, 0]])
    
    # Define start and end nodes
    start_node = 0
    end_node = 3
    
    # Initialize and run ACO
    aco = AntColony(graph, start_node, end_node, n_ants=10, n_iterations=100)
    best_path, best_path_length = aco.run()
    print("Best path:", best_path)
    print("Best path length:", best_path_length)
