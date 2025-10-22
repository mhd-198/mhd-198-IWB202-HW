$(function () {
  const defaultApps = [
    {
      name: "ChatGPT",
      company: "OpenAI",
      domain: "Education",
      free: true,
      url: "https://chat.openai.com",
      desc: "مساعد ذكي يعتمد على الذكاء الاصطناعي للتفاعل مع المستخدمين.",
      image: "img/img-1.jpg",
      video: "ved/v-1.mp4",
    },
    {
      name: "TensorFlow",
      company: "Google",
      domain: "Industrial IoT",
      free: true,
      url: "https://www.tensorflow.org",
      desc: "مكتبة مفتوحة المصدر لتعلم الآلة.",
      image: "img/img-2.jpg",
      video: "ved/v-2.mp4",
    },
    {
      name: "ClevrAI",
      company: "Clevr",
      domain: "E-Commerce",
      free: false,
      url: "https://example.com/clevr",
      desc: "نظام AI لتحسين تجربة التسوق عبر الإنترنت وتخصيص اقتراحات المنتجات.",
      image: "img/img-3.jpg",
      video: "ved/v-3.mp4",
    },
    {
      name: "RoboArm",
      company: "InduTech A1",
      domain: "Robotics",
      free: false,
      url: "#",
      desc: "ذراع روبوتية ذكية مخصصة للتصنيع الدقيق والتحكم بالحركات.",
      image: "img/img-4.jpg",
      video: "ved/v-4.mp4",
    },
    {
      name: "MediScan",
      company: "HealthSoft",
      domain: "Healthcare",
      free: true,
      url: "#",
      desc: "تشخيص طبي يعتمد على الذكاء الاصطناعي لتحليل الصور الطبية ومساعدة الأطباء.",
      image: "img/img-5.jpg",
      video: "ved/v-5.mp4",
    },
  ];

  let apps = JSON.parse(localStorage.getItem("apps")) || defaultApps;
  renderApps();

  function renderApps() {
    const table = $("#appsTable");
    if (!table.length) return;
    table.find("tr:gt(0)").remove();

    apps.forEach((app, i) => {
      const row = $(`<tr>
        <td>${app.name}</td>
        <td>${app.company}</td>
        <td>${app.domain}</td>
        <td>${
          app.free
            ? '<span class="badge ok">✓</span>'
            : '<span class="badge no">✗</span>'
        }</td>
        <td><input type="checkbox" class="toggleDetails" data-index="${i}"></td>
      </tr>`);

      const details = $(`
  <tr class="details">
    <td colspan="5">
      <div class="details-content">
        <p><strong>الوصف:</strong> ${app.desc}</p>
        <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center; margin:10px 0;">
          <img src="img/img-${i + 1}.jpg" alt="${
        app.name
      }" style="max-width:260px; border-radius:12px;">
          <video src="ved/v-${
            i + 1
          }.mp4" controls style="max-width:260px; border-radius:12px;"></video>
        </div>
        <p><strong>الموقع:</strong> <a href="${app.url}" target="_blank">${
        app.url
      }</a></p>
      </div>
    </td>
  </tr>
`);

      table.append(row, details);
    });
  }

  $(document).on("change", ".toggleDetails", function () {
    const detailsRow = $(this).closest("tr").next(".details");
    if (this.checked) {
      detailsRow.addClass("show");
    } else {
      detailsRow.removeClass("show");
    }
  });

  $("#appForm").on("submit", function (e) {
    if (!$(this).length) return;
    e.preventDefault();

    const appName = $("#appName").val().trim();
    const company = $("#company").val().trim();
    const url = $("#url").val().trim();
    const free = $("#free").is(":checked");
    const domain = $("#domain").val();
    const desc = $("#description").val().trim();

    if (!/^[A-Za-z]+$/.test(appName)) {
      alert("اسم التطبيق: أحرف إنكليزية فقط بدون فراغات");
      return;
    }
    if (!/^[A-Za-z ]+$/.test(company)) {
      alert("اسم الشركة: أحرف إنكليزية ومسافة فقط");
      return;
    }
    try {
      new URL(url);
    } catch (e) {
      alert("الرجاء إدخال رابط صحيح يبدأ بـ https://");
      return;
    }

    const newApp = {
      name: appName,
      company,
      domain,
      free,
      url,
      desc,
      image: "img/img-default.jpg",
      video: "ved/v-default.mp4",
    };

    apps.push(newApp);
    localStorage.setItem("apps", JSON.stringify(apps));
    alert("تمت الإضافة بنجاح ✔");
    location.href = "apps.html";
  });
});
