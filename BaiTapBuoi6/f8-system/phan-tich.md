# Phân tích CSS Priority — F8 System Project

## Câu 1: Selector nào có độ ưu tiên cao nhất trong CSS?

**Inline style** có độ ưu tiên cao nhất trong CSS (không tính `!important`).

Thứ tự ưu tiên từ cao xuống thấp:

| Mức | Loại | Ví dụ | Điểm Specificity |
|-----|------|-------|-----------------|
| 1 (cao nhất) | Inline style | `style="color: red"` | 1000 |
| 2 | ID selector | `#main` | 100 |
| 3 | Class / Attribute / Pseudo-class | `.title`, `[type]`, `:hover` | 10 |
| 4 | Tag / Pseudo-element | `h1`, `p`, `::before` | 1 |

> Ghi chú: `!important` phá vỡ quy tắc thông thường và luôn thắng tất cả, nhưng không được dùng trong bài này.

---

## Câu 2: Nếu một phần tử HTML có cả `h1`, `.title`, và `#main` cùng set color — selector nào thắng? Tại sao?

**`#main` thắng.**

**Lý do:** CSS Specificity tính theo điểm số:
- `h1` = 1 điểm (tag selector)
- `.title` = 10 điểm (class selector)  
- `#main` = 100 điểm (ID selector)

`#main` có điểm cao nhất (100) nên selector này thắng, dù `.title` hay `h1` được khai báo sau trong file CSS.

**Ví dụ trong project:** Phần tử `<h1 class="title" id="main">` trong `home/index.html` — hiển thị màu `#37474f` (màu của `#main` trong `base.css`).

---

## Câu 3: Nếu bạn thêm `style="color: pink"` trực tiếp vào phần tử ở Câu 2, kết quả thay đổi như thế nào?

**Kết quả: phần tử sẽ hiển thị màu `pink`.**

**Lý do:** Inline style có điểm specificity = **1000**, cao hơn tất cả:
- `style="..."` → 1000 điểm
- `#main` → 100 điểm
- `.title` → 10 điểm
- `h1` → 1 điểm

Inline style luôn thắng tất cả selector dù selector đó có bao nhiêu class hay ID đi nữa.

**Ví dụ trong project:** Phần tử `<h1 class="title" id="special" style="color: #d500f9;">` trong `dashboard/index.html` — hiển thị màu `#d500f9` (inline style thắng dù có cả `#special` với 100 điểm và `.title` với 10 điểm).

---

## Câu 4: Tại sao `theme.css` có thể override style từ `base.css`? Điều kiện để override thành công là gì?

**Lý do:** Khi hai selector có **cùng specificity**, quy tắc CSS quyết định như sau: **selector nào được khai báo sau sẽ thắng** (Cascade — tầng xếp chồng).

**Điều kiện để override thành công:**
1. **Thứ tự link:** `theme.css` phải được `<link>` **sau** `base.css` trong HTML. Nếu link ngược lại, `base.css` sẽ thắng.
2. **Cùng specificity:** `theme.css` dùng cùng loại selector (ví dụ: cả hai dùng `.title` → đều 10 điểm). Nếu `theme.css` dùng selector có specificity thấp hơn, nó sẽ không override được.

**Trong project:**
```html
<link rel="stylesheet" href="../css/base.css">  <!-- load trước -->
<link rel="stylesheet" href="../css/theme.css"> <!-- load sau → thắng khi cùng specificity -->
```

---

## Câu 5: Trong project có hai phần tử đều dùng class `.title` nhưng hiển thị màu khác nhau. Giải thích tại sao.

**Ví dụ:** Trong `home/index.html`:
- `<h1 class="title" id="main">` → hiển thị màu `#37474f` (xám đậm)
- `<h2 class="title">` → hiển thị màu `#00695c` (xanh lá — theme.css)

**Giải thích:**
- Phần tử `<h2 class="title">`: chỉ có tag `h2` (1 điểm) và `.title` (10 điểm). **`.title` thắng** → màu `#00695c` (theme.css override base.css vì link sau).
- Phần tử `<h1 class="title" id="main">`: có thêm `#main` (100 điểm). **`#main` thắng tất cả** (100 > 10 > 1) → màu `#37474f` (màu của `#main` trong base.css, theme.css không override `#main`).

**Kết luận:** Cùng dùng `.title` nhưng phần tử nào có thêm `#main` (ID) thì ID thắng, bỏ qua `.title` hoàn toàn.

---

## Câu 6: Phần tử nào trong project có CSS phức tạp nhất? Liệt kê các selector tác động lên nó và giải thích selector nào thắng cuối cùng.

**Phần tử phức tạp nhất:** `<h1 class="title" id="special" style="color: #d500f9;">` trong `dashboard/index.html`.

**Tất cả selector tác động:**

| Nguồn | Selector | Specificity | Màu áp dụng |
|-------|----------|-------------|-------------|
| `base.css` | `h1` | (0,0,1) = 1 | `#1a237e` |
| `base.css` | `.title` | (0,1,0) = 10 | `#bf360c` |
| `base.css` | `#special` | (1,0,0) = 100 | `#1565c0` |
| `theme.css` | `.title` | (0,1,0) = 10 | `#00695c` |
| `theme.css` | `#special` | (1,0,0) = 100 | `#e65100` |
| `dashboard/index.html` | Internal CSS `h3.title` | — | (không áp dụng cho h1) |
| Inline style | `style="color: #d500f9"` | 1000 | `#d500f9` |

**Selector thắng: Inline style (1000 điểm)**

**Lý do:** Inline style có specificity = 1000, cao hơn tất cả mọi selector bên ngoài hay bên trong. Dù phần tử có `#special` (100 điểm) từ cả `base.css` lẫn `theme.css`, inline style vẫn áp đảo hoàn toàn.

**Màu hiển thị cuối cùng: `#d500f9` (tím neon — inline style)**
