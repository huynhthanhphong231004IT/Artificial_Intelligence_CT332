// Lưu trữ thứ tự duyệt cho thuật toán leo đồi
let traversalOrderHillClimbing = [];
let visited = new Set(); // Tập hợp để lưu các đỉnh đã duyệt

// Hàm Leo Đồi để tìm đường đi từ start đến end
function hillClimbingAlgorithm(start, end) {
    // Đặt lại thứ tự duyệt và tập visited mỗi khi gọi hàm tìm đường đi mới
    function node(state,parent,h){
        this.state=state;
        this.parent=parent;
        this.h=h;
    }

    let table = document.getElementById("table_result_hill").getElementsByTagName("tbody")[0];
    table.innerHTML='';
    document.getElementById("table_result_hill").style.display = "block"
    document.getElementById("table_result_greedy").style.display = "none"
    document.getElementById("table_result").style.display = "none"
    traversalOrderHillClimbing = [];
    visited.clear();
    let close = [];
    let current = start;
    traversalOrderHillClimbing.push(current);
    visited.add(current);

    while (current !== end) {
        let newRow = document.createElement("tr");
        let neighbors = edges.filter(edge => edge.from === current).map(edge => edge.to);     
                let cell_1 = document.createElement("td");
                cell_1.textContent=current+"(h="+hValues[current]+")";
                newRow.appendChild(cell_1);
                table.appendChild(newRow);
                //
                for(i=0;i<neighbors.length;i++){
                    for (let element of visited){
                        if(neighbors[i]==element){
                            neighbors.splice(i,1);
                        }
                    }
                }
                let cell_2 = document.createElement("td");
                for(i=0;i<neighbors.length;i++){
                    cell_2.textContent+=neighbors[i]+"(h="+hValues[neighbors[i]]+")"+" ";
                }
                newRow.appendChild(cell_2);
                table.appendChild(newRow);
                //
                close.push(current);
        let bestNeighbor = null;
        let lowestHScore = Infinity;
        neighbors.forEach(neighbor => {
            // Chỉ kiểm tra các đỉnh chưa được duyệt
            if (!visited.has(neighbor) && hValues[neighbor] < lowestHScore) {
                lowestHScore = hValues[neighbor];
                bestNeighbor = neighbor;
            }
        });

        // Nếu tìm thấy đỉnh kề tốt hơn
        if (bestNeighbor) {
            current = bestNeighbor;
            visited.add(current);
            traversalOrderHillClimbing.push(current);
        } else {
            // Nếu không có đỉnh kề nào tốt hơn, dừng lại (kẹt tại cực trị cục bộ)
                let cell_3 = document.createElement("td");
                for(i=0; i<close.length;i++){
                    cell_3.textContent+=close[i]+"(h="+hValues[close[i]]+")"+" ";
                }
                newRow.appendChild(cell_3);
                table.appendChild(newRow);
            
            return [];
        }
                let cell_3 = document.createElement("td");
                for(i=0; i<close.length;i++){
                    cell_3.textContent+=close[i]+"(h="+hValues[close[i]]+")"+" ";
                }
                newRow.appendChild(cell_3);
                table.appendChild(newRow);
    }
                let newRow = document.createElement("tr");
                let cell_1 = document.createElement("td");
                cell_1.textContent=end+"(h="+hValues[end]+")";
                newRow.appendChild(cell_1);
                table.appendChild(newRow);

                let cell_2 = document.createElement("td");
                newRow.appendChild(cell_2);
                table.appendChild(newRow);

                close.push(end);
                let cell_3 = document.createElement("td");
                for(i=0; i<close.length;i++){
                    cell_3.textContent+=close[i]+"(h="+hValues[close[i]]+")"+" ";
                }
                newRow.appendChild(cell_3);
                table.appendChild(newRow);
                
    // Tạo lại đường đi từ thứ tự duyệt
    return traversalOrderHillClimbing;
}

// Hàm để lấy thứ tự duyệt của thuật toán leo đồi
function getTraversalOrderHillClimbing() {
    return traversalOrderHillClimbing;
}
