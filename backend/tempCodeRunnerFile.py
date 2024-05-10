     current_node_index = self.node_to_index[current_node]
        probabilities = self.calculate_probabilities(current_node_index, visited)
        next_node_label = np.random.choice(list(probabilities.keys()), p=list(probabilities.values()))
        return next_node_label
