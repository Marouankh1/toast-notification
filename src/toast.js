((global) => {
	
	function createElements_toast() {
		const elementToast = `
                            <div class="toastBox hide">
                                <i></i>
                                <div class='contentText' >
                                    <span class='title'></span>
                                    <span class='msg'></span>
                                </div>
                                <span class="close-btn" onclick="toastBoxNotification.hideToast()">
                                    <i class='bx bx-x'></i>
                                </span>
                            </div>`;

		document
			.querySelector("body")
			.insertAdjacentHTML("afterend", elementToast);

		createCss_toastBox();
		createCss_divText();
		createCss_toastTitle();
		createCss_toastMessage();
		createCss_toastClose();

		function createCss_toastBox() {
			// add display options to toastBox
			let styleToastBox = `display: none;
                                position: absolute;
                                padding: 20px 40px;
                                min-width: 32%;
                                right: 5px;
                                top: 10px;
                                overflow: hidden;
                                border-radius: 4px;
                                z-index: 1000;`;

			document
				.querySelector(".toastBox")
				.setAttribute("style", styleToastBox);
		}
	}

	function createCss_divText() {
		// add display options to toastBox
		let styleToastText = `display: flex;
                            flex-direction: column;`;
		document
			.querySelector(".contentText")
			.setAttribute("style", styleToastText);
	}

	function createCss_toastTitle() {
		let styleToastTitle = `font-family: Comfortaa;
                                padding: 0 0 0 10px;
                                font-size: 17px;`;

		document
			.querySelector(".toastBox .contentText .title")
			.setAttribute("style", styleToastTitle);
	}

	function createCss_toastMessage() {
		let styleToastMessage = `font-family: ComfortaaLight;
                                padding: 3px 20px 0 10px;
                                font-size: 14px;`;

		document
			.querySelector(".toastBox .contentText .msg")
			.setAttribute("style", styleToastMessage);
	}

	function createCss_iconToast(classIcon, color) {
		let styleToastMessage = `position: absolute;
                                left: 13px;
                                top: 50%;
                                transform: translateY(-50%);
                                color: ${color};
                                font-size: 30px;`;

		document
			.querySelector(`.${classIcon}`)
			.setAttribute("style", styleToastMessage);
	}

	function createCss_toastClose() {
		let styleToastClose = `position: absolute;
                                right: 0;
                                top: 50%;
                                transform: translateY(-50%);
                                padding: 20px 10px;
                                cursor: pointer;`;

		let styleCloseIcon = `font-size: 30px;
                            line-height: 40px;`;

		document
			.querySelector(".toastBox .close-btn")
			.setAttribute("style", styleToastClose);
		document
			.querySelector(".close-btn .bx-x")
			.setAttribute("style", styleCloseIcon);
	}

	function bodySection(
		Title,
		titleColor,
		message,
		messageColor,
		spanClose,
		iconCloseColor
	) {
		const $titleElement = document.querySelector(".title");
		const $messageElement = document.querySelector(".msg");
		$titleElement.textContent = `${Title} : `;
		$messageElement.textContent = `${message}`;
		$titleElement.style.color = titleColor;
		$messageElement.style.color = messageColor;
		document.querySelector(".toastBox .close-btn").style.background =
			spanClose;
		document.querySelector(".close-btn > i").style.color = iconCloseColor;
	}

	function iconSection(IconCLass, iconStatusColor) {
		const $iconStatus = document.querySelector(".toastBox > i");
		$iconStatus.className = `bx ${IconCLass}`;
		createCss_iconToast(IconCLass, iconStatusColor);
	}

	function prepareToast(background, borderLeft) {
		const $toastBoxClass = document.querySelector(".toastBox");
		$toastBoxClass.style.background = background;
		$toastBoxClass.style.borderLeft = borderLeft;
		$toastBoxClass.style.display = "flex";
		$toastBoxClass.classList.remove("hide");
		$toastBoxClass.classList.add("show");
	}

	function animationShow() {
		const newspaperSpinning = [
			{ transform: "translateX(100%)" },
			{ transform: "translateX(-10%)" },
			{ transform: "translateX(0%)" },
			{ transform: "translateX(-10px)" },
		];
		document.querySelector(".toastBox.show").animate(newspaperSpinning, {
			duration: 1000,
			fill: "forwards",
			easing: "ease",
		});
	}

	function removeToast() {
		const $toastBoxClass = document.querySelector(".toastBox");
		$toastBoxClass.classList.remove("show");
		$toastBoxClass.classList.add("hide");
	}

	function animationHide() {
		const newspaperSpinning = [
			{ transform: "translateX(-10px)" },
			{ transform: "translateX(0%)" },
			{ transform: "translateX(-5%)" },
			{ transform: "translateX(calc(100% + 20px)" },
		];

		document.querySelector(".toastBox.hide").animate(newspaperSpinning, {
			duration: 1000,
			fill: "forwards",
			easing: "ease",
		});
	}

	function showToast(message, notifySetting) {
		// prepare body section
		bodySection(
			notifySetting.Title,
			notifySetting.titleColor,
			message,
			notifySetting.messageColor,
			notifySetting.spanClose,
			notifySetting.iconCloseColor
		);

		// prepare icon section
		iconSection(notifySetting.IconCLass, notifySetting.iconStatusColor);

		// prepare toast
		prepareToast(notifySetting.background, notifySetting.borderLeft);

		// animation section
		animationShow();
	}

	function hideToast() {
		removeToast();

		animationHide();
	}

	function onSuccess(message, timeWait = 3000, title = "Success") {
		// active toast
		const notifySetting = {
			Title: title,
			titleColor: "#03c513",
			background: "#fff",
			borderLeft: "10px solid #00ff15",
			IconCLass: "bxs-check-circle",
			iconStatusColor: "#00e112",
			messageColor: "#34c15e",
			spanClose: "#fff",
			iconCloseColor: "#00ce4f",
		};

		showToast(message, notifySetting);

		clearTimeout(localStorage.getItem("timeWait"));

		let setTimeWait = setTimeout(() => {
			// desactive toast
			const $textBox = document.querySelector(".toastBox").classList;
			if (Array.from($textBox).includes("show")) {
				hideToast();
			}
		}, timeWait);

		localStorage.setItem("timeWait", setTimeWait);
	}

	function onError(message, timeWait = 3000, title = "Error") {
		// active toast
		const notifySetting = {
			Title: title,
			titleColor: "#f90000",
			background: "#fff",
			borderLeft: "10px solid #ff0101",
			IconCLass: "bxs-x-circle",
			iconStatusColor: "#f90000",
			messageColor: "#ed0000",
			spanClose: "#fff",
			iconCloseColor: "#ff0000",
		};

		showToast(message, notifySetting);

		clearTimeout(localStorage.getItem("timeWait"));

		let setTimeWait = setTimeout(() => {
			// desactive toast
			const $textBox = document.querySelector(".toastBox").classList;
			if (Array.from($textBox).includes("show")) {
				hideToast();
			}
		}, timeWait);

		localStorage.setItem("timeWait", setTimeWait);
	}

	function onWarning(message, timeWait = 3000, title = "Warning") {
		// active toast
		const notifySetting = {
			Title: title,
			titleColor: "#e3a702",
			background: "#fff",
			borderLeft: "10px solid #ffbc00",
			IconCLass: "bxs-error-circle",
			iconStatusColor: "#e3a702",
			messageColor: "#efb000",
			spanClose: "#ffff",
			iconCloseColor: "#ffbc00",
		};

		showToast(message, notifySetting);

		clearTimeout(localStorage.getItem("timeWait"));

		let setTimeWait = setTimeout(() => {
			// desactive toast
			const $textBox = document.querySelector(".toastBox").classList;
			if (Array.from($textBox).includes("show")) {
				hideToast();
			}
		}, timeWait);

		localStorage.setItem("timeWait", setTimeWait);
	}

	global.toastBoxNotification = {
		hideToast,
		showToast,
		onSuccess,
		onWarning,
		onError,
	};

	createElements_toast();

	global.toastBoxNotification = toastBoxNotification;
	
})(window);
