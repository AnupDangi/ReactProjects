import "./Model.css";

export default function Model({ id, header, body, footer, onClose }) {
    return (
        <div id={id || "Model"} className="model">
            <div className="model-content">
                <span onClick={onClose} className="close-model-icon">
                    &times;
                </span>
                <div className="header">{header ? header : "Header"}</div>
                <div className="body">{body ? body : <p>This is our Modal body</p>}</div>
                <div className="footer">{footer ? footer : <h2>Footer</h2>}</div>
            </div>
        </div>
    );
}
