function getPageList(totalPages, page, maxLength){
			function range(start, end){
				return Array.from(Array(end - start + 1), (_, i) => i + start);
			}


			var sideWidth = maxLength < 9 ? 1 : 2;
			var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
			var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;

			if (totalPages <= maxLength) {
				return range(1, totalPages);
			}

			if (page <= maxLength - sideWidth - 1 - rightWidth) {
				return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
			}

			if (page >= totalPages - sideWidth - 1 - rightWidth) {
				return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
			}

			return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
}


$(function(){
			var numberOfItems = $(".card_content .card").length;
			var limitPerPage = 9; //How many Items visible per page
			var numberOfPages = Math.ceil(numberOfItems / limitPerPage);
			var paginationSize = 7; //How many page elements visible in the pagination
			var currentPage;


			function showPage(whichPage){
				if (whichPage < 1 || whichPage > numberOfPages) return false;

				currentPage = whichPage;

				$(".card_content .card").hide().slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage).show();

				$(".pagination li").slice(1, -1).remove();

				getPageList(numberOfPages, currentPage, paginationSize).forEach(item => {
					$("<li>").addClass("page_item").addClass(item ? "current_page" : "dots").toggleClass("active", item === currentPage).append($("<a>").addClass("page_link").attr({href: "javascript:void(0)"}).text(item || "...")).insertBefore(".next_page");
				});

				$(".previous_page").toggleClass("disable", currentPage === 1);
				$(".next_page").toggleClass("disable", currentPage === numberOfPages);
				return true;
			}

			$(".pagination").append(
				$("<li>").addClass("page_item").addClass("previous_page").append($("<a>").addClass("page_link").attr({href: "javascript:void(0)"}).text("Prev")),
				$("<li>").addClass("page_item").addClass("next_page").append($("<a>").addClass("page_link").attr({href: "javascript:void(0)"}).text("Next"))
			);

			$(".card_content").show();
			showPage(1);

			$(document).on("click", ".pagination li.current_page:not(.active)", function(){
				return showPage(+$(this).text());
			});

			$(".next_page").on("click", function(){
				return showPage(currentPage + 1);
			});

			$(".previous_page").on("click", function(){
				return showPage(currentPage - 1);
			});
});