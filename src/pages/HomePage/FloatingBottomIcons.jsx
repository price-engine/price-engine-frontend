export default function FloatingBottomIcons({ hasScrolledDown, setCartShown }) {
  return (
    <div className="floating-bottom-icons-container">
      {hasScrolledDown && (
        <button className="scrollup-btn floating-icon floating-bottom-icon" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          ^
        </button>
      )}
      <button className="cart-btn floating-icon floating-bottom-icon" onClick={() => setCartShown(true)}>
        🛒
      </button>
    </div>
  );
}
