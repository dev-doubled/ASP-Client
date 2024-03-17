import React, { useState } from "react";
import classNames from "classnames/bind";
import { reportProfileDatas } from "~/datas/reportProfileDatas";
import styles from "./ReportAccount.module.scss";
const cx = classNames.bind(styles);
function ReportAccount({ setShowReportProfile }) {
  const [selectedReport, setSelectedReport] = useState(null);

  const handleRadioChange = (reportId) => {
    setSelectedReport(reportId);
  };

  const handleSave = () => {
    console.log(`Saving report with ID: ${selectedReport}`);
  };

  const handleCancel = () => {
    setShowReportProfile(false);
  };
  return (
    <div
      className={cx("report-pin-wrapper")}
      onClick={() => setShowReportProfile(false)}
    >
      <div
        className={cx("report-pin-container")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cx("report-pin-heading")}>
          <div className={cx("heading-text")}>Report account</div>
        </div>
        <div className={cx("report-pin-content")}>
          <div className={cx("report-pin-main")}>
            <div className={cx("report-item-main")}>
              {reportProfileDatas.map((report) => (
                <div className={cx("report-item")} key={report.id}>
                  <div className={cx("select-report")}>
                    <input
                      type="radio"
                      id={`select-rp-${report.id}`}
                      name="reportGroup"
                      className={cx("input-report")}
                      checked={selectedReport === report.id}
                      onChange={() => handleRadioChange(report.id)}
                    />
                  </div>
                  <div className={cx("report-content")}>
                    <label
                      htmlFor={`select-rp-${report.id}`}
                      className={cx("report-title")}
                    >
                      {report.title}
                    </label>
                    <div className={cx("report-desc")}>{report.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={cx("report-pin-footer")}>
          <div className={cx("report-pin-action")}>
            <button className={cx("cancel-action")} onClick={handleCancel}>
              <span className={cx("text")}>Cancel</span>
            </button>
            <button
              className={cx("save-action")}
              disabled={selectedReport === null}
              onClick={handleSave}
            >
              <span className={cx("text")}>Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportAccount;
