export default function SidebarContainer({ hasScrolledDown, setCartShown }) {
  return (
    <div className="sidebar-btns-container">
      {hasScrolledDown && (
        <button className="scrollup-btn sidebar-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          ^
        </button>
      )}
      <button className="cart-btn sidebar-btn" onClick={() => setCartShown(true)}>
        🛒
      </button>
    </div>
  );
}
