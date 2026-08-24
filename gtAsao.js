
// Hàm A* để tìm đường đi từ start đến end
function aStarAlgorithm(start, end) {
    function node(state,parent,g,h,f){
        this.state=state;
        this.parent=parent;
        this.g=g;
        this.h=h;
        this.f=f;
    }
    // Đặt lại thứ tự duyệt mỗi khi gọi hàm tìm đường đi mới
    traversalOrder = [];
    let openSet = new Set(); // Các đỉnh cần kiểm tra
    let open = []//lay dinh dang cho xet
    let closedSet = []; // Tập close lưu các đỉnh đã được duyệt
    let cameFrom = {}; // Theo dõi đường đi từ đỉnh đến đỉnh
    let gScore = {}; // Chi phí từ start đến đỉnh
    let fScore = {}; // Ước lượng chi phí từ start đến end qua đỉnh
    let table = document.getElementById("table_result").getElementsByTagName("tbody")[0];
    table.innerHTML='';
    document.getElementById("table_result").style.display = "block"
    document.getElementById("table_result_greedy").style.display = "none"
    document.getElementById("table_result_hill").style.display = "none"
    vertices.forEach(vertex => {
        gScore[vertex] = Infinity;
        fScore[vertex] = Infinity;
    });
    gScore[start] = 0;
    fScore[start] = (hValues[start] || 0); // Tính f cho đỉnh bắt đầu
    let Node = new node(start,"_",gScore[start],hValues[start],fScore[start]);
    openSet.add(start);
    open.push(Node);
    while (openSet.size > 0) {
        let newRow = document.createElement("tr");
        let state = [];// chưa tập sinh
        // Lấy đỉnh có fScore thấp nhất
        let current = Array.from(openSet).reduce((min, vertex) => fScore[vertex] < fScore[min] ? vertex : min, Array.from(openSet)[0]);
        let newNode = new node(current,cameFrom[current],gScore[current],hValues[current],fScore[current])
        for(i=0;i<open.length;i++){
            if(open[i].state==newNode.state){
                open.splice(i,1)
            }
        }
        closedSet.push(newNode)
        //console.log(closedSet)
        if (current === end) {
            traversalOrder.push(current); // Đưa đỉnh kết thúc vào thứ tự duyệt
            for(i=0;i<open.length;i++){
                if(open[i].state==newNode.state){
                    open.splice(i,1)
                }
            }
            let cell_1 = document.createElement("td");
            cell_1.textContent=newNode.state + "("+newNode.parent+","+newNode.g+","+newNode.h+","+newNode.f+")";
            newRow.appendChild(cell_1);
            table.appendChild(newRow);
            //
            let cell_2 = document.createElement("td");
            for(i=0;i<state.length;i++){
                cell_2.textContent+=state[i].state + "("+state[i].parent+","+state[i].g+","+state[i].h+","+state[i].f+")"+" ";
            }
            newRow.appendChild(cell_2);
            table.appendChild(newRow);
            //
            let cell_3 = document.createElement("td");
            for(i=0;i<open.length;i++){
                cell_3.textContent+=open[i].state + "("+open[i].parent+","+open[i].g+","+open[i].h+","+open[i].f+")"+" ";
            }
            newRow.appendChild(cell_3);
            table.appendChild(newRow);
            //
            let cell_4 = document.createElement("td");
            for(i=0;i<closedSet.length;i++){
                if(closedSet[i].parent==undefined){
                    cell_4.textContent+=closedSet[i].state + "("+"_"+","+closedSet[i].g+","+closedSet[i].h+","+closedSet[i].f+")"+" ";
                }
                else{
                    cell_4.textContent+=closedSet[i].state + "("+closedSet[i].parent+","+closedSet[i].g+","+closedSet[i].h+","+closedSet[i].f+")"+" ";
                }
            }
            newRow.appendChild(cell_4);
            table.appendChild(newRow);
            return reconstructPath(cameFrom, current);
        }
        // console.log(newNode);
        if(newNode.parent==undefined){
            //let newRow = document.createElement("tr");
            let cell_1 = document.createElement("td");
            cell_1.textContent=Node.state + "("+Node.parent+","+Node.g+","+Node.h+","+Node.f+")";
            newRow.appendChild(cell_1);
            table.appendChild(newRow);
        }
        else{
            //let newRow = document.createElement("tr");
            let cell_1 = document.createElement("td");
            cell_1.textContent=newNode.state + "("+newNode.parent+","+newNode.g+","+newNode.h+","+newNode.f+")";
            newRow.appendChild(cell_1);
            table.appendChild(newRow);
        }
        openSet.delete(current);
        traversalOrder.push(current);
        let neighbors = edges.filter(edge => edge.from === current).map(edge => edge.to);
        neighbors.forEach(neighbor => {
            let tentativeGScore = gScore[current] + getEdgeWeight(current, neighbor);
            if (tentativeGScore < gScore[neighbor]) {
                cameFrom[neighbor] = current;
                gScore[neighbor] = tentativeGScore;
                fScore[neighbor] = gScore[neighbor] + (hValues[neighbor] || 0); // Tính lại fScore cho đỉnh lân cận
                let node_next = new node(neighbor, current, gScore[neighbor], hValues[neighbor], fScore[neighbor]);
                state.push(node_next);
                
                // Nếu đỉnh đang trong closedSet nhưng có f lớn hơn giá trị mới, cập nhật và chuyển vào open
                let inClosedIndex = closedSet.findIndex(n => n.state === neighbor);
                if (inClosedIndex !== -1 && closedSet[inClosedIndex].f > fScore[neighbor]) {
                    closedSet.splice(inClosedIndex, 1); // Xóa đỉnh khỏi closedSet
                }
        
                // Cập nhật open nếu có đỉnh với f lớn hơn
                for (let i = 0; i < open.length; i++) {
                    if (open[i].state === neighbor) {
                        if (open[i].f > fScore[neighbor]) {
                            open.splice(i, 1);
                        }
                    }
                }
        
                open.push(node_next); // Thêm đỉnh mới vào open
                if (!openSet.has(neighbor)) {
                    openSet.add(neighbor);
                }
            }
        });        
            let cell_1 = document.createElement("td");
            for(i=0;i<state.length;i++){
                cell_1.textContent+=state[i].state + "("+state[i].parent+","+state[i].g+","+state[i].h+","+state[i].f+")"+" ";
            }
            newRow.appendChild(cell_1);
            table.appendChild(newRow);

            let cell_2 = document.createElement("td");
            for(i=0;i<open.length;i++){
                cell_2.textContent+=open[i].state + "("+open[i].parent+","+open[i].g+","+open[i].h+","+open[i].f+")"+" ";
            }
            newRow.appendChild(cell_2);
            table.appendChild(newRow);
            let cell_3 = document.createElement("td");
            for(i=0;i<closedSet.length;i++){
                if(closedSet[i].parent==undefined){
                    cell_3.textContent+=closedSet[i].state + "("+"_"+","+closedSet[i].g+","+closedSet[i].h+","+closedSet[i].f+")"+" ";
                }
                else{
                    cell_3.textContent+=closedSet[i].state + "("+closedSet[i].parent+","+closedSet[i].g+","+closedSet[i].h+","+closedSet[i].f+")"+" ";
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
function getTraversalOrder() {
    return traversalOrder;
}
