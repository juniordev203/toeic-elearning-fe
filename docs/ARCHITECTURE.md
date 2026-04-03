# Frontend Architecture: TOEIC Dictation

Dự án này sử dụng kiến trúc **Feature-Sliced Design / Feature-based Architecture** kết hợp với **Next.js App Router**. Mục tiêu là tách biệt rõ ràng giữa Routing (điều hướng) và Business Logic (nghiệp vụ).

## 1. Trả lời câu hỏi: Đâu là thư mục làm việc chính?

**Thư mục làm việc CHÍNH của tổ đội code Frontend là: `src/features/`**

### Tại sao không phải là `app/` hay `components/`?

- **`src/app/`**: Chỉ đóng vai trò là **Router** và **Layout**. Nhiệm vụ của nó là map URL (ví dụ `/lessons`) tới giao diện tương ứng và gói ghém Layout bảo vệ các route đó. **Tuyệt đối KHÔNG viết logic nghiệp vụ (API call, State, Effect) phức tạp trong thư mục này**. Mã nguồn trong `app/` nên càng mỏng càng tốt.
- **`src/components/`**: Dùng để chứa các **Dumb Components**. Tức là các component thuần UI, dùng chung ở khắp nơi và thường không mang state phức tạp hay gọi API (Ví dụ: `Button`, `Input`, `Dialog`, `Header`, `Footer`).
- **`src/features/`**: Đây là nơi chứa **Smart Components** và **Business Logic**. Toàn bộ trái tim của ứng dụng nằm ở đây. Mỗi tính năng nghiệp vụ sẽ có một folder riêng (vd: `auth`, `lessons`, `dictation`), bên trong chứa đầy đủ components, hooks, stores phục vụ cho riêng tính năng đó.

---

## 2. Cấu trúc thư mục chi tiết

```text
src/
├── api/                  # Nơi chứa config gọi API
│   ├── generated/        # (DON'T TOUCH) Code tự sinh ra từ backend (Orval)
│   └── axios-instance.ts # Cấu hình Axios (Base URL, JWT Header)
│
├── app/                  # Next.js Routing & Layouts
│   ├── (user)/           # Route Group: Các trang của User (Home, Bài tập)
│   ├── (admin)/          # Route Group: Các trang của Admin (Dashboard)
│   ├── (auth)/           # Route Group: Trang Đăng nhập / Đăng ký
│   ├── layout.tsx        # Global Layout (Inject Provider, Fonts, Metadata)
│   └── globals.css       # Global styles
│
├── components/           # UI Components tái sử dụng
│   ├── ui/               # Components từ library (Shadcn UI)
│   └── common/           # Shared components (Header, Footer, Layouts)
│
├── features/             # LÕI NGHIỆP VỤ (Vùng code chính)
│   ├── auth/             # Logic đăng nhập, đăng ký
│   │   ├── components/   # LoginForm, RegisterForm
│   │   ├── hooks/        # useAuth...
│   │   └── types/        # type riêng của auth
│   │
│   ├── lessons/          # Danh sách bài học
│   │   ├── components/   # LessonList, LessonCard, FilterBar
│   │   └── hooks/        # useFetchLessons...
│   │
│   └── dictation/        # Tâm điểm: Player nghe và chép chính tả
│       ├── components/   # AudioPlayer, TypingArea, ResultModal
│       ├── hooks/        # useDictationEngine (So khớp chuỗi)
│       └── store/        # Zustand (Quản lý trạng thái bài đang làm)
│
├── hooks/                # Hooks dùng chung (Global)
│   ├── useDebounce.ts
│   └── useLocalStorage.ts
│
├── lib/                  # Utilities, Helper functions
│   └── utils.ts          # Các hàm format String, Data phổ biến
│
└── store/                # Global State (Zustand)
    └── useAuthStore.ts   # Lưu trữ user profile, session state
```

## 3. Quy tắc Code (Golden Rules)

1. **Clean Code trong `app/`**: File `page.tsx` chỉ nên import 1 Component lớn từ `features/` và return nó.

   ```tsx
   // Ví dụ đúng: src/app/(user)/lessons/page.tsx
   import { LessonListFeature } from '@/features/lessons/components/LessonListFeature';

   export default function LessonsPage() {
     return <LessonListFeature />;
   }
   ```

2. **Feature Encapsulation**: Nếu một component chỉ dùng riêng cho trang Luyện nghe (Dictation), hãy vứt nó vào `src/features/dictation/components/`, **đừng** vứt ngoài `src/components/`. Chỉ đưa code ra ngoài khi nó share giữa nhiều feature khác nhau.
3. **Data Fetching via React Query**: Khuyến khích gọi API trực tiếp ngay bên trong các Component/Hooks của `features/` thông qua `useQuery` và `useMutation` (Được hỗ trợ nhờ TanStack Query + Orval).
4. **Local State vs Global State**:
   - State chỉ ảnh hưởng 1 trang (vd: Input search) -> dùng `useState`.
   - State ảnh hưởng diện rộng, cần cross-component (vd: Trạng thái bài làm dictation, User đang login) -> dùng `Zustand` (cấp feature hoặc cấp root).
