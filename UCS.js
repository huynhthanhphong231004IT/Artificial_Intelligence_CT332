// Lưu trữ thứ tự duyệt
let traversalOrderUCS = [];

// Hàm UCS để tìm đường đi từ start đến end
function ucsAlgorithm(start, end) {
    // Đặt lại thứ tự duyệt mỗi khi gọi hàm tìm đường đi mới
    traversalOrderUCS = [];
    function node(state,parent,g){
        this.state=state;
        this.parent=parent;
        this.g=g;
    }

    let openSet = new Set(); // Các đỉnh cần kiểm tra
    let cameFrom = {}; // Theo dõi đường đi từ đỉnh đến đỉnh
    let gScore = {}; // Chi phí từ start đến đỉnh
    let close = [];
    let open = [];
    let table = document.getElementById("table_result").getElementsByTagName("tbody")[0];
    table.innerHTML='';
    document.getElementById("table_result").style.display = "block"
    document.getElementById("table_result_greedy").style.display = "none"
    document.getElementById("table_result_hill").style.display = "none"
    // Khởi tạo
    vertices.forEach(vertex => {
        gScore[vertex] = Infinity;
    });

    gScore[start] = 0;
    let Node = new node(start,"_",gScore[start])
    openSet.add(start);
    open.push(Node);
    while (openSet.size > 0) {
        let newRow = document.createElement("tr");
        let state = [];
        // Lấy đỉnh có gScore thấp nhất
        let current = Array.from(openSet).reduce((min, vertex) => gScore[vertex] < gScore[min] ? vertex : min, Array.from(openSet)[0]);
        let newNode = new node(current, cameFrom[current], gScore[current]);
        for(i=0;i<open.length;i++){
            if(open[i].state==current && open[i].parent==cameFrom[current] && open[i].g==gScore[current]){
                open.splice(i,1)
            }
        }
        close.push(newNode);
        if (current == end) {
            traversalOrderUCS.push(current); // Đưa đỉnh kết thúc vào thứ tự duyệt
            for(i=0;i<open.length;i++){
                if(open[i].state==end){
                    open.splice(i,1)
                }
            }
            if(newNode.parent==undefined){
                let cell_1 = document.createElement("td");
                cell_1.textContent=Node.state + "("+Node.parent+", g="+Node.g+")";
                newRow.appendChild(cell_1);
                table.appendChild(newRow);
            }
            else{
                let cell_1 = document.createElement("td");
                cell_1.textContent=newNode.state + "("+newNode.parent+", g="+newNode.g+")";
                newRow.appendChild(cell_1);
                table.appendChild(newRow);
            }
            //
            let cell_1 = document.createElement("td");
            for(i=0;i<state.length;i++){
                cell_1.textContent+=state[i].state + "("+state[i].parent+", g="+state[i].g+")"+" ";
            }
            newRow.appendChild(cell_1);
            table.appendChild(newRow);
            //
            let cell_2 = document.createElement("td");
            for(i=0;i<open.length;i++){
                cell_2.textContent+=open[i].state + "("+open[i].parent+", g="+open[i].g+")"+" ";
            }
            newRow.appendChild(cell_2);
            table.appendChild(newRow);
            //
            let cell_3 = document.createElement("td");
            for(i=0;i<close.length;i++){
                if(close[i].parent==undefined){
                    cell_3.textContent+=close[i].state + "("+"_"+","+close[i].g+")"+" ";
                }
                else{
                    cell_3.textContent+=close[i].state + "("+close[i].parent+","+close[i].g+")"+" ";
                }
            }
            newRow.appendChild(cell_3);
            table.appendChild(newRow);

            return reconstructPath(cameFrom, current);
        }

        if(newNode.parent==undefined){
            let cell_1 = document.createElement("td");
            cell_1.textContent=Node.state + "("+Node.parent+", g="+Node.g+")";
            newRow.appendChild(cell_1);
            table.appendChild(newRow);
        }
        else{
            let cell_1 = document.createElement("td");
            cell_1.textContent=newNode.state + "("+newNode.parent+", g="+newNode.g+")";
            newRow.appendChild(cell_1);
            table.appendChild(newRow);
        }

        openSet.delete(current);
        traversalOrderUCS.push(current);

        let neighbors = edges.filter(edge => edge.from === current).map(edge => edge.to);
        neighbors.forEach(neighbor => {
            let tentativeGScore = gScore[current] + getEdgeWeight(current, neighbor);
            if (tentativeGScore < gScore[neighbor]) {
                cameFrom[neighbor] = current;
                gScore[neighbor] = tentativeGScore;
                let node_next = new node(neighbor, cameFrom[neighbor], gScore[neighbor]);
                state.push(node_next);
                for(i=0;i<open.length;i++){
                    if(open[i].state==neighbor){
                        if(open[i].g>gScore[neighbor]){
                            open.splice(i,1)
                        }
                    }
                }
                open.push(node_next);
                if (!openSet.has(neighbor)) {
                    openSet.add(neighbor);
                }
            }
        });
        
        let cell_1 = document.createElement("td");
        for(i=0;i<state.length;i++){
            cell_1.textContent+=state[i].state + "("+state[i].parent+", g="+state[i].g+")"+" ";
        }
        newRow.appendChild(cell_1);
        table.appendChild(newRow);
        //
        let cell_2 = document.createElement("td");
        for(i=0;i<open.length;i++){
            cell_2.textContent+=open[i].state + "("+open[i].parent+", g="+open[i].g+")"+" ";
        }
        newRow.appendChild(cell_2);
        table.appendChild(newRow);
        //
        let cell_3 = document.createElement("td");
        for(i=0;i<close.length;i++){
            if(close[i].parent==undefined){
                cell_3.textContent+=close[i].state + "("+"_"+","+close[i].g+")"+" ";
            }
            else{
                cell_3.textContent+=close[i].state + "("+close[i].parent+","+close[i].g+")"+" ";
            }
        }
        newRow.appendChild(cell_3);
        table.appendChild(newRow);
    }

    return []; // Nếu không tìm thấy đường đi
}

// Hàm để tái tạo đường đi từ cameFrom
function reconstructPath(cameFrom, current) {
    let path = [current];
    while (cameFrom[current]) {
        current = cameFrom[current];
        path.push(current);
    }
    path.reverse();
    return path;
}

// Hàm để lấy trọng số của cạnh
function getEdgeWeight(from, to) {
    let edge = edges.find(edge => edge.from === from && edge.to === to);
    return edge ? edge.weight : Infinity;
}

// Hàm để lấy thứ tự duyệt
function getTraversalOrderUCS() {
    return traversalOrderUCS;
}
