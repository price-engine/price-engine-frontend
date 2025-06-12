import { Link } from "react-router";
import FloatingTopIcons from "../../HomePage/FloatingTopIcons";
import Footer from "../../HomePage/Footer";
import Navbar from "../../../components/Navbar/Navbar";
import "../article-style.css";

export default function HowToSearchPage() {
  return (
    <>
      <Navbar />
      <div className="article-page">
        <FloatingTopIcons />
        <Link className="app-logo-container" to="/">
          <img className="app-logo" src="/logo.png" alt="Price Engine" />
        </Link>
        <div className="article-card" style={{ direction: "rtl" }}>
          <h3 style={{ textAlign: "center" }}>خد بالك وانت بتبحث</h3>
          <br />
          <ol>
            <li>
              التهجئة والمسافات بتفرق:
              <ul>
                <li>
                  لو بحثت عن "leno" <strong>مش</strong> هتظهر نتائج ل "lenovo".
                </li>
                <li>
                  "b850" <strong>مش</strong> هتظهر نتائج ل "b850m".
                </li>
                <li>
                  "14600K" <strong>مش</strong> هتظهر نتائج ل "14600KF".
                </li>
                
                <li>
                  "9060xt" <strong>مش</strong> هتظهر نتائج ل
                  <p style={{ direction: "ltr", display: "inline" }}>"9060 xt" </p>.
                </li>
                <li>
                  "8GB" هتظهر نتائج <strong>مختلفة</strong> عن
                  <p style={{ direction: "ltr", display: "inline" }}>"8 GB" </p>.
                </li>
                <li>مفيش بحث واحد مضمون يجيبلك 100% من النتائج.</li>
                <li>لذلك دائما ابحث أكتر من مرة باستخدام مزيج مختلف من التهجئة والمسافات.</li>
              </ul>
            </li>
            <br />
            <li>
              حاجات مش لازم تهتم بيها:
              <ul>
                <li>
                  ترتيب الكلمات: "a35 galaxy samsung" <strong>هي نفسها</strong> "samsung galaxy a35".
                </li>
                <li>حالة الحروف Capital or small مش فارقة.</li>
              </ul>
            </li>
            <br />
            <li>
              كل كلمة بتكتبها بتفلتر النتائج أكتر:
              <ul>
                <li>
                  لو كتبت "logitech mouse white" <strong>مش</strong> هيظهرلك النتائج اللي اسمها "logitech mouse" ومفيهاش
                  كلمة "white".
                </li>
              </ul>
            </li>
            <br />
            <li>
              متخترش أي تصنيف نهائي إلا لو مضطر ، التصنيفات بتضيع عليك جزء من نتائج البحث لإن:
              <ul>
                <li>فيه محلات بتستخدم تصنيف "storage" بدل ال 3 تصنيفات: hdd, ssd nvme, ssd sata.</li>
                <li>فيه محلات بتستخدم تصنيف "cooling" بدل ال 3 تصنيفات: air cooler, liquid cooler, thermal paste.</li>
                <li>وبالتالي لو انت اخترت التصنيف الدقيق بتفوتك المنتجات اللي موجودة في التصنيف الكبير.</li>
                <li>فيه محلات معندهاش تصنيفات ال combo.</li>
                <li>الأفضل متخترش تصنيف أصلا لإن فيه محلات بتحط منتجات في تصنيفات لا تخطر على البال.</li>
              </ul>
            </li>
            <br />
            <li>استخدم الميزة رقم 3 لصالحك المفروض إنها تغنيك عن اختيار التصنيفات.</li>
            <br />
          </ol>
          <ul></ul>
        </div>
        <Footer />
      </div>
    </>
  );
}
