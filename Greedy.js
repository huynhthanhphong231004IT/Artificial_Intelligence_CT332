traversalOrderGreedy = [];
// Hàm Greedy để tìm đường đi từ start đến end
function greedyAlgorithm(start, end) {
    function node(state, parent, g, h, f) {
        this.state = state;
        this.parent = parent;
        this.g = g;
        this.h = h;
        this.f = f;
    }

    let openSet = new Set();
    let open = [];
    let close = [];
    let cameFrom = {};
    let gScore = {}; // Chi phí từ start đến mỗi đỉnh
    let table = document.getElementById("table_result_greedy").getElementsByTagName("tbody")[0];
    table.innerHTML = '';
    document.getElementById("table_result_greedy").style.display = "block"
    document.getElementById("table_result").style.display = "none"
    document.getElementById("table_result_hill").style.display = "none"
    vertices.forEach(vertex => {
        cameFrom[vertex] = null;
        gScore[vertex] = Infinity; // Khởi tạo chi phí đến các đỉnh là vô cực
    });

    openSet.add(start);
    gScore[start] = 0; // Chi phí của điểm bắt đầu bằng 0
    let Node = new node(start, "_", gScore[start], hValues[start], hValues[start]);
    open.push(Node);
    while (openSet.size > 0) {
        let newRow = document.createElement("tr");
        let state = []; // chứa các đỉnh mới sinh ra
        // Chọn đỉnh có gScore + h nhỏ nhất
        let current = Array.from(openSet).reduce((min, vertex) =>
            gScore[vertex] + hValues[vertex] < gScore[min] + hValues[min] ? vertex : min,
            Array.from(openSet)[0]
        );
        let newNode = new node(current, cameFrom[current], gScore[current], hValues[current], hValues[current])
        for (i = 0; i < open.length; i++) {
            if (open[i].state == newNode.state) {
                open.splice(i, 1)
            }
        }
        close.push(newNode);
        //console.log(close);
        if (current === end) {
            traversalOrderGreedy.push(current);

            if (newNode.parent == undefined) {
                let cell_1 = document.createElement("td");
                cell_1.textContent = Node.state + "(" + Node.parent + ", h=" + Node.h + ")";
                newRow.appendChild(cell_1);
                table.appendChild(newRow);
            }
            else {
                let cell_1 = document.createElement("td");
                cell_1.textContent = newNode.state + "(" + newNode.parent + ", h=" + newNode.h + ")";
                newRow.appendChild(cell_1);
                table.appendChild(newRow);
            }
            let cell_1 = document.createElement("td");
            for (i = 0; i < state.length; i++) {
                cell_1.textContent += state[i].state + "(" + state[i].parent + ", h=" + state[i].h + ")" + " ";
            }
            newRow.appendChild(cell_1);
            table.appendChild(newRow);
            let cell_3 = document.createElement("td");
            for (i = 0; i < close.length; i++) {
                if (close[i].parent == undefined) {
                    cell_3.textContent += close[i].state + "(" + "_" + "," + close[i].h + ")" + " ";
                }
                else {
                    cell_3.textContent += close[i].state + "(" + close[i].parent + "," + close[i].h + ")" + " ";
                }
            }
            newRow.appendChild(cell_3);
            table.appendChild(newRow);
            return reconstructPath(cameFrom, current);
        }
        if (newNode.parent == undefined) {
            let cell_1 = document.createElement("td");
            cell_1.textContent = Node.state + "(" + Node.parent + ", h=" + Node.h + ")";
            newRow.appendChild(cell_1);
            table.appendChild(newRow);
        }
        else {
            let cell_1 = document.createElement("td");
            cell_1.textContent = newNode.state + "(" + newNode.parent + ", h=" + newNode.h + ")";
            newRow.appendChild(cell_1);
            table.appendChild(newRow);
        }
        openSet.delete(current);
        traversalOrderGreedy.push(current);

        let neighbors = edges.filter(edge => edge.from === current).map(edge => edge.to);
        neighbors.forEach(neighbor => {
            let tentative_gScore = gScore[current] + getEdgeWeight(current, neighbor);
            //let tentative_gScore = gScore[current];
            if (tentative_gScore < gScore[neighbor]) {
                cameFrom[neighbor] = current;
                gScore[neighbor] = tentative_gScore;
                let node_next = new node(neighbor, cameFrom[neighbor], gScore[neighbor], hValues[neighbor], hValues[neighbor])
                state.push(node_next);
                open.push(node_next);
                openSet.add(neighbor);
            }
        });
        let cell_1 = document.createElement("td");
        for (i = 0; i < state.length; i++) {
            cell_1.textContent += state[i].state + "(" + state[i].parent + ", h=" + state[i].h + ")" + " ";
        }
        newRow.appendChild(cell_1);
        table.appendChild(newRow);
        let cell_3 = document.createElement("td");
        for (i = 0; i < close.length; i++) {
            if (close[i].parent == undefined) {
                cell_3.textContent += close[i].state + "(" + "_" + "," + close[i].h + ")" + " ";
            }
            else {
                cell_3.textContent += close[i].state + "(" + close[i].parent + "," + close[i].h + ")" + " "; 
            }
        }
        newRow.appendChild(cell_3);
        table.appendChild(newRow);
    }

    return [];
}

// Hàm để lấy trọng số của cạnh
function getEdgeWeight(from, to) {
    let edge = edges.find(edge => edge.from === from && edge.to === to);
    return edge ? edge.weight : Infinity;
}

function getTraversalOrderGreedy() {
    return traversalOrderGreedy;
}
