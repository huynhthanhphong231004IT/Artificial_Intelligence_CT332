<div align="center">

# PathFinder: Website trực quan hóa các thuật toán tìm đường trong không gian trạng thái (A*, UCS, Greedy, Hill Climbing)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-1E88E5?style=for-the-badge&logo=github&logoColor=white)](https://huynhthanhphong231004it.github.io/Artificial_Intelligence_CT332/)


**CT332 – Trí tuệ nhân tạo - Trường CNTT&TT, Đại học Cần Thơ**

Sinh viên thực hiện: Huỳnh Thanh Phong (MSSV: B2207555)
Giáo viên hướng dẫn: TS. Lưu Tiến Đạo

[![Facebook](https://img.shields.io/badge/Facebook-Huỳnh%20Thanh%20Phong-E53935?style=for-the-badge&logo=facebook&logoColor=white&labelColor=333333)](https://www.facebook.com/huynh.thanh.phong.561667)
[![TikTok](https://img.shields.io/badge/TikTok-@reorioll-E53935?style=for-the-badge&logo=tiktok&logoColor=white&labelColor=333333)](https://www.tiktok.com/@reorioll)
[![YouTube](https://img.shields.io/badge/YouTube-ReoRioll-E53935?style=for-the-badge&logo=youtube&logoColor=white&labelColor=333333)](https://www.youtube.com/@ReoRioll-2304CICTCTU)


</div>

---

## 1. Tóm tắt

Ứng dụng web cho phép **nạp đồ thị từ file `.txt` → chọn đỉnh đầu/cuối → chọn thuật toán → xem đường đi, thứ tự duyệt và bảng Open/Close từng bước**.

```mermaid
flowchart LR
    %% Định nghĩa phong cách màu sắc chuẩn Academic (Paper-Ready Multi-Color)
    classDef fileNode fill:#FFFDE7,stroke:#FBC02D,stroke-width:1.5px,color:#F57F17,font-weight:bold;
    classDef graphNode fill:#E8F5E9,stroke:#2E7D32,stroke-width:1.5px,color:#1B5E20,font-weight:bold;
    classDef selectNode fill:#FFF3E0,stroke:#EF6C00,stroke-width:2px,color:#E65100,font-weight:bold;
    
    %% Màu riêng cho từng thuật toán
    classDef astarNode fill:#E3F2FD,stroke:#1565C0,stroke-width:1.5px,color:#0D47A1,font-weight:bold;
    classDef ucsNode fill:#F3E5F5,stroke:#7B1FA2,stroke-width:1.5px,color:#4A148C,font-weight:bold;
    classDef greedyNode fill:#E0F2F1,stroke:#00695C,stroke-width:1.5px,color:#004D40,font-weight:bold;
    classDef hcNode fill:#FCE4EC,stroke:#C2185B,stroke-width:1.5px,color:#880E4F,font-weight:bold;
    
    %% Kết quả đầu ra
    classDef pathNode fill:#E8EAF6,stroke:#3F51B5,stroke-width:2px,color:#1A237E,font-weight:bold;
    classDef tableNode fill:#EFEBE9,stroke:#5D4037,stroke-width:2px,color:#3E2723,font-weight:bold;

    %% Các nút trong sơ đồ
    A["Tệp dữ liệu đầu vào<br/>input.txt"]:::fileNode
    B["Biểu diễn Đồ thị<br/>+ Hàm Heuristic h(n)"]:::graphNode
    C{"Chọn thuật toán<br/>tìm kiếm"}:::selectNode

    D["Thuật toán A*<br/>(A-Star Search)"]:::astarNode
    E["Thuật toán UCS<br/>(Uniform Cost)"]:::ucsNode
    F["Thuật toán Greedy<br/>(Best-First Search)"]:::greedyNode
    G["Hill Climbing<br/>(Leo đồi)"]:::hcNode

    H["Kết quả tìm kiếm:<br/>Đường đi · Chi phí · Thứ tự duyệt"]:::pathNode
    I["Nhật ký trạng thái:<br/>Bảng Open / Closed"]:::tableNode

    %% Luồng liên kết
    A --> B
    B --> C

    C --> D
    C --> E
    C --> F
    C --> G

    D --> H
    E --> H
    F --> H
    G --> H

    D --> I
    E --> I
    F --> I
    G --> I
```

| Thành phần | Công nghệ |
|---|---|
| Giao diện | HTML, Bootstrap 5 |
| Vẽ đồ thị | vis-network |
| Thuật toán | JavaScript (không backend) |

---

## 2. Phương pháp

### 2.1 Luồng xử lý chung

```mermaid
flowchart TD
    A[Chọn file input] --> B[parseInputFile]
    B --> C[vertices, edges, hValues]
    C --> D[drawGraph: vẽ đồ thị có hướng + hiển thị h]
    D --> E[Nhập start, end, chọn giải thuật]
    E --> F[Gọi hàm thuật toán tương ứng]
    F --> G[Ghi từng bước vào bảng kết quả]
    G --> H[Hiển thị path, cost, traversal order]
```

### 2.2 Định dạng input

```
A 5 B 3 C 0          # dòng 1: đỉnh và giá trị h  → "đỉnh h đỉnh h ..."
A B 2                # các dòng sau: "từ đến trọng_số"
B C 4
```

Đồ thị **có hướng**, trọng số cạnh dương, `h` là heuristic của từng đỉnh.

### 2.3 Bốn thuật toán

| Thuật toán | Chọn đỉnh mở rộng | Cấu trúc | Đảm bảo tối ưu |
|---|---|---|---|
| **A\*** (`gtAsao.js`) | `f = g + h` nhỏ nhất | Open + Close, có cập nhật khi tìm đường tốt hơn | Có (h chấp nhận được) |
| **UCS** (`UCS.js`) | `g` nhỏ nhất | Open + Close | Có |
| **Greedy** (`Greedy.js`) | `h` nhỏ nhất | Close | Không |
| **Hill Climbing** (`hillClimbing.js`) | Láng giềng chưa duyệt có `h` nhỏ nhất | Close | Không, có thể kẹt cực trị cục bộ |

```mermaid
flowchart TD
    S[Bắt đầu tại start] --> P{Đã tới end?}
    P -- Có --> R[Dựng lại đường đi từ cameFrom]
    P -- Không --> Q[Sinh đỉnh kề]
    Q --> U[Cập nhật g / f / Open]
    U --> V[Đưa đỉnh vào Close, ghi 1 dòng vào bảng]
    V --> W{Còn đỉnh để xét?}
    W -- Có --> P
    W -- Không --> X[Không tìm thấy đường đi]
```

### 2.4 Cấu trúc thư mục

```
├── index.html        # giao diện + bố cục 3 cột
├── javascript.js     # đọc file, vẽ đồ thị, điều phối thuật toán
├── gtAsao.js         # A*
├── UCS.js            # Uniform Cost Search
├── Greedy.js         # Greedy Best-First
├── hillClimbing.js   # Hill Climbing
└── input*.txt        # đồ thị mẫu
```

### 2.5 Chạy thử

```bash
git clone https://github.com/huynhthanhphong231004IT/Artificial_Intelligence_CT332.git
# mở index.html bằng trình duyệt → Chọn File (input.txt) → Tải → Tìm đường đi
```

> **Lưu ý:** `index.html` gọi `ucs.js` và `greedy.js` (chữ thường) trong khi file thực tế là `UCS.js`, `Greedy.js`. Trên Windows/macOS chạy bình thường; trên Linux hoặc GitHub Pages cần đổi tên file hoặc sửa thẻ `<script>` cho khớp.

---

## 3. Đóng góp

So với các công cụ minh họa tìm kiếm thường gặp (chỉ hoạt ảnh đường đi trên lưới/mê cung, hoặc mã giáo trình chạy console):

| | Công cụ thông thường | Dự án này |
|---|---|---|
| Dữ liệu đầu vào | Cố định hoặc vẽ tay trên lưới | **Đồ thị bất kỳ nạp từ file `.txt`**, kèm `h` |
| Quá trình chạy | Chỉ hiện kết quả/hoạt ảnh | **Bảng từng bước**: đỉnh xét → đỉnh sinh ra → Open → Close, kèm `(cha, g, h, f)` |
| Thuật toán | Thường 1–2 loại | **4 thuật toán cùng một giao diện, cùng một input** để so sánh trực tiếp |
| Giới hạn thuật toán | Ít được nêu | **Hill Climbing báo kẹt cực trị cục bộ** khi không còn láng giềng tốt hơn |
| Triển khai | Cần cài môi trường/server | **Thuần client**: mở `index.html` là chạy |

**Đóng góp chính:** biến các bước chạy tay trên giấy (bảng Open/Close trong giáo trình) thành kết quả tự động, đối chiếu được ngay với lời giải của bài tập, trên cùng một đồ thị cho cả bốn thuật toán.

---

## 4. Kết luận

- Hoàn thành bộ công cụ trực quan cho **4 thuật toán tìm kiếm** với đầu vào linh hoạt và bảng giải trình từng bước.
- Phù hợp để **học, kiểm tra bài tập và so sánh** giữa tìm kiếm mù (UCS), có thông tin (A\*, Greedy) và cục bộ (Hill Climbing).

**Hướng phát triển:** thêm BFS/DFS, đo số đỉnh mở rộng/thời gian để so sánh định lượng, cho phép chỉnh sửa đồ thị trực tiếp trên giao diện, mở rộng sang điều khiển tác nhân trong môi trường Pacman.
