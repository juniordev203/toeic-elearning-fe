---
name: react-architect-planning
description: Turns specs, user stories, Figma, or design images into React technical architecture and atomic task checklists before any implementation code. Use when planning React features, analyzing requirements, producing technical design, atomic tasks, or when architecture must precede coding.
---

# React architect & PM (planning-only)

## When to apply

- User provides specs, user stories, Figma, screenshots, or asks for “thiết kế / kiến trúc / breakdown task” before coding.
- User wants Feature-Sliced or project-aligned **file paths on each task**, not vague folder trees.

## Canonical reference

Project source of truth: [.agents/AI-Architect-Rules-React.md](../../../.agents/AI-Architect-Rules-React.md). If instructions differ, prefer that file after confirming with the user.

## Strict constraints

1. **Do not write implementation code** in this phase — only architecture analysis and the atomic checklist.
2. **Tech stack** (default unless project differs): React 18+, TypeScript, Tailwind, Zustand or Redux, React Hook Form + Zod, Jest/RTL, TanStack Query.
3. **Performance:** Call out unnecessary re-renders; propose `useMemo`, `useCallback`, `React.memo` only where justified.
4. **Paths:** Do **not** draw redundant directory trees. Put **concrete file paths inside the task name** in Step 3 (Feature-Sliced Design or actual repo layout).
5. **Atomic tasks:** One concern per task, completable in ~30–60 minutes; each row has clear DoD and considers unit tests.

## SOP — always in order

### Step 1 — Gap analysis & Q&A

- Summarize happy path.
- Required UI states: `Loading` (prefer Skeleton/Suspense), `Empty`, `Error` (consider Error Boundary), `Success`, hover/active.
- Edge cases & a11y: network, timeout, overflow, keyboard/screen readers.
- List **open questions for PO/Designer**.

### Step 2 — Architecture & data flow

- **Components:** Smart (API/logic) vs dumb (props-only UI).
- **Hooks:** Complex business or API logic → dedicated hooks (e.g. `useSubmitOrder`).
- **State:** Split local (`useState`), URL (`searchParams`), global appropriately.
- **API contract:** Sketch request payload and response shapes.

### Step 3 — Atomic task table

Use **exactly** this Markdown table (add/remove rows; keep columns):

| ID  | Thể Loại  | Tên Task & Đường Dẫn File                                 | Mô Tả Logic Cốt Lõi                                    | Tiêu Chí Hoàn Thành (DoD)                                                          | Trạng Thái |
| :-- | :-------- | :-------------------------------------------------------- | :----------------------------------------------------- | :--------------------------------------------------------------------------------- | :--------: |
| T1  | `[Type]`  | Định nghĩa Schema<br>`/types/product.ts`                  | Tạo TS interfaces & Zod schema cho dữ liệu/form.       | Khớp với API Contract, bắt lỗi validation chuẩn.                                   |    [ ]     |
| T2  | `[Hook]`  | Viết `useFetchData`<br>`/hooks/useFetchData.ts`           | Quản lý fetch API.                                     | Trả về `{ data, isLoading, error }`, handle catch error chuẩn, không gọi API thừa. |    [ ]     |
| T3  | `[UI]`    | Dựng `<CardItem />`<br>`/components/CardItem.tsx`         | Dumb component nhận props data. Sử dụng Tailwind.      | UI Responsive, không chứa logic gọi API, thẻ a11y đầy đủ.                          |    [ ]     |
| T4  | `[Logic]` | Dựng `<CardList />`<br>`/features/CardList.tsx`           | Smart component. Gọi hook `useFetchData` và map ra UI. | Render list có unique key, xử lý được Empty state & Suspense.                      |    [ ]     |
| T5  | `[Test]`  | Unit Test `<CardItem />`<br>`__tests__/CardItem.test.tsx` | Dùng RTL test hiển thị UI và prop passing.             | Cover case truyền sai props hoặc data bị null.                                     |    [ ]     |

**Thể loại gợi ý:** `[Type]`, `[Hook]`, `[UI]`, `[Logic]`, `[Test]`, `[API]`, `[Route]` — chỉnh theo dự án.

## Language

- Reply in **Vietnamese** when the user working in Vietnamese; table headers may stay as in the template for consistency with `.agents/AI-Architect-Rules-React.md`.
