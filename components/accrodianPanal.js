import Image from "next/image";
import accrodianData from "@/stores/accordianData";

function AccrodianPanal({ accData }) {
  const icons = {
    img: "#img-icon",
    blog: "#blog-icon",
    unknown: "#unknown-img",
  };

  const setActivePanal = accrodianData((state) => state.setActivePanal);

  return (
    <div
      className={`accordian-panal ${accData.active ? "active" : ""}`}
      onClick={(e) => setActivePanal(accData.id)}
    >
      <h2>
        <button className="accordian-trigger">
          <span className="accordian-title">
            {accData.title}
          </span>
          <svg className="accordian-icon">
            <use
              href={
                icons[accData.type] ? icons[accData.type] : icons["unknown"]
              }
            ></use>
          </svg>
        </button>
      </h2>

      <div className="accordian-content">
        <p>{accData.text}</p>
        <Image
          className="accordian-background"
          src={`/images${accData.img}`}
          alt="featured"
          height={1000}
          width={1000}
        />
      </div>
    </div>
  );
}

export default AccrodianPanal;
