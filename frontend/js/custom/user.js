// Biến khởi tạo
var timeOut_modalCart;
var viewout = true;
var check_show_modal = true;

//Delay action
function delayTime(func, wait) {
    return function () {
        var that = this,
            args = [].slice(arguments);
        clearTimeout(func._throttleTimeout);
        func._throttleTimeout = setTimeout(function () {
            func.apply(that, args);
        }, wait);
    };
}

var HRT = {
    init: function () {
        var that = this;
        that.initViews();
        that.Main.init();
        /*that.All.getCartModal('first');*/
    },
    initViews: function () {
        var view = window.template,
            that = this;
        switch (view) {
            case "index":
            case "index.grid-01":
            case "index.grid-02":
            case "index.grid-03":
                that.Index.init();
                that.Quickview.init();
                break;
            case "collection":
                that.Collection.init();
                that.Quickview.init();
                break;
            case "collection.mini":
                that.CollectionMini.init();
                that.Quickview.init();
                break;
            case "product":
            case "product.style-01":
            case "product.style-02":
            case "product.style-03":
                that.Product.init();
                break;
            case "product.quickview":
                that.Quickview.init();
                break;
            case "search":
                break;
                that.Quickview.init();
            case "blog":
                break;
            case "article":
                that.Article.init();
                break;
            case "page.contact":
                break;
            case "page":
                break;
            case "page.landing-page-01":
                that.Ldpage01.init();
                break;
            case "customers[order]":
                break;
            case "cart":
                HRT.Cart.init();
                break;
            default:
        }
    },
};

HRT.All = {
    checkCart: function () {
        $.ajax({
            url: "/cart.js",
            type: "GET",
            async: false,
            success: function (cart) {
                $(".count-holder .count").html(cart.item_count);
                cartGet = cart;
                if (cart.items.length > 0) {
                    cart.items.map((x, i) => {
                        $(
                            '.proloop--action[data-vrid="' +
                            x.variant_id +
                            '"] .proloop-qtyvalue'
                        ).val(x.quantity);
                        $('.proloop--action[data-vrid="' + x.variant_id + '"]').addClass(
                            "action-count"
                        );
                    });
                }
            },
        });
    },
    notifyProduct: function ($info) {
        var wait = setTimeout(function () {
            $.jGrowl($info, {
                life: 2000,
            });
        });
    },
    fixHeightProduct: function (data_parent, data_target, data_image) {
        var box_height = 0;
        var box_image = 0;
        var boxtarget = data_parent + " " + data_target;
        var boximg = data_parent + " " + data_target + " " + data_image;
        jQuery(boximg).css("height", "auto");
        jQuery($(boxtarget)).css("height", "auto");
        jQuery($(boxtarget)).removeClass("fixheight");
        jQuery($(boxtarget)).each(function () {
            if (
                jQuery(this)
                    .find(data_image + " .lazyloaded")
                    .height() > box_image
            ) {
                box_image = jQuery(this).find($(data_image)).height();
            }
        });
        if (box_image > 0) {
            jQuery(boximg).height(box_image);
        }
        jQuery($(boxtarget)).each(function () {
            if (jQuery(this).height() > box_height) {
                box_height = jQuery(this).height();
            }
        });
        jQuery($(boxtarget)).addClass("fixheight");
        if (box_height > 0) {
            jQuery($(boxtarget)).height(box_height);
        }
        try {
            fixheightcallback();
        } catch (ex) {
        }
    },
    getCartModal: function (check) {
        var cart = null;
        jQuery("#cartform").hide();
        jQuery("#myCart #exampleModalLabel").text("Giỏ hàng");
        jQuery.getJSON("/cart.js", function (cart, textStatus) {
            if (cart) {
                /*
				jQuery('#cartform').show();
				jQuery('body').addClass('mainBody-mbcart');
				jQuery('.line-item:not(.original)').remove();
				jQuery.each(cart.items,function(i,item){
					var total_line = 0;
					var total_line = item.quantity * item.price;
					tr = jQuery('.original').clone().removeClass('original').appendTo('table#cart-table tbody');
					if(item.image != null)
						tr.find('.item-image').html("<img src=" + Haravan.resizeImage(item.image,'small') + ">");
					else
						tr.find('.item-image').html("<img src='//theme.hstatic.net/200000258387/1000809443/14/no_image.jpg?v=155'>");
					vt = item.variant_options;
					if(vt.indexOf('Default Title') != -1)
						vt = '';
					tr.find('.item-title').children('a').html(item.product_title + '<br><span>' + vt + '</span>').attr('href', item.url);
					tr.find('.item-quantity').html("<input id='quantity1' name='updates[]' min='1' type='number' value=" + item.quantity + " class='' />");
					if ( typeof(formatMoney) != 'undefined' ){
						tr.find('.item-price').html(Haravan.formatMoney(total_line, formatMoney));
					}else {
						tr.find('.item-price').html(Haravan.formatMoney(total_line, ''));
					}
					tr.find('.item-delete').html("<a href='javascript:void(0);' onclick='HRT.All.deleteCart(" + (i+1) + ","+item.variant_id+")' ><i class='fa fa-times'></i></a>");
				});
				jQuery('.item-total').html(Haravan.formatMoney(cart.total_price, formatMoney));
				jQuery('.modal-title').children('b').html(cart.item_count);
				*/

                jQuery(".count-holder .count").html(cart.item_count);
                jQuery(".siteCart-mobile__header .p-count").html(
                    cart.item_count + " sản phẩm"
                );
                if (cart.item_count == 0) {
                    $(".header-action_cart .cart-view-render").html(
                        '<div class="mini-cart__empty"><div><div class="svgico-mini-cart"> <svg width="81" height="70" viewBox="0 0 81 70"><g transform="translate(0 2)" stroke-width="4" fill="none" fill-rule="evenodd"><circle stroke-linecap="square" cx="34" cy="60" r="6"></circle><circle stroke-linecap="square" cx="67" cy="60" r="6"></circle><path d="M22.9360352 15h54.8070373l-4.3391876 30H30.3387146L19.6676025 0H.99560547"></path></g></svg></div> Hiện chưa có sản phẩm</div></div>'
                    );
                    $(".siteCart-mobile .cart-view-render").html(
                        '<div class="mini-cart__empty"><div><div class="svgico-mini-cart"> <svg width="81" height="70" viewBox="0 0 81 70"><g transform="translate(0 2)" stroke-width="4" fill="none" fill-rule="evenodd"><circle stroke-linecap="square" cx="34" cy="60" r="6"></circle><circle stroke-linecap="square" cx="67" cy="60" r="6"></circle><path d="M22.9360352 15h54.8070373l-4.3391876 30H30.3387146L19.6676025 0H.99560547"></path></g></svg></div> Hiện chưa có sản phẩm</div></div>'
                    );
                    jQuery("#cartform").hide();
                    jQuery(".siteCart-mobile").removeClass("show-cart");
                    jQuery("body")
                        .removeClass("mainBody-mbcart")
                        .removeClass("body-showcart");
                } else {
                    jQuery("body").addClass("mainBody-mbcart");
                    /*jQuery('#exampleModalLabel').html('Bạn có ' + cart.item_count + ' sản phẩm trong giỏ hàng.');*/
                    jQuery("#cartform").removeClass("hidden");
                    $(".header-action_cart .cart-view-render").html("");
                    $(".siteCart-mobile .cart-view-render").html("");
                }
                // Get product for cart view
                jQuery.each(cart.items, function (i, item) {
                    HRT.All.clone_item(item, i);
                });

                jQuery(".sitenav-cart .mnc-total-price").html(
                    Haravan.formatMoney(cart.total_price, formatMoney)
                );
                jQuery(".siteCart-mobile__header .p-price").html(
                    Haravan.formatMoney(cart.total_price, formatMoney)
                );
                if (priceMin != "") {
                    if (priceMin > cart.total_price / 100) {
                        $(".linktocheckout").attr("href", "/cart");
                        $(".order-summary-block.order-summary-notify").removeClass("hide");
                    } else {
                        $(".linktocheckout").attr("href", "/checkout");
                        $(".order-summary-block.order-summary-notify").addClass("hide");
                    }
                }
            } else {
                /*jQuery('#exampleModalLabel').html('Giỏ hàng của bạn đang trống. Mời bạn tiếp tục mua hàng.');*/
                if (jQuery("#cart-pos-product").length > 0) {
                    jQuery("#cart-pos-product span").html(cart.item_count + " sản phẩm");
                }
                jQuery(".siteCart-mobile__header .p-count").html(
                    cart.item_count + " sản phẩm"
                );
                $(".header-action_cart .cart-view-render").html(
                    '<div class="mini-cart__empty"><div><div class="svgico-mini-cart"> <svg width="81" height="70" viewBox="0 0 81 70"><g transform="translate(0 2)" stroke-width="4" fill="none" fill-rule="evenodd"><circle stroke-linecap="square" cx="34" cy="60" r="6"></circle><circle stroke-linecap="square" cx="67" cy="60" r="6"></circle><path d="M22.9360352 15h54.8070373l-4.3391876 30H30.3387146L19.6676025 0H.99560547"></path></g></svg></div> Hiện chưa có sản phẩm</div></div>'
                );
                $(".siteCart-mobile .cart-view-render").html(
                    '<div class="mini-cart__empty"><div><div class="svgico-mini-cart"> <svg width="81" height="70" viewBox="0 0 81 70"><g transform="translate(0 2)" stroke-width="4" fill="none" fill-rule="evenodd"><circle stroke-linecap="square" cx="34" cy="60" r="6"></circle><circle stroke-linecap="square" cx="67" cy="60" r="6"></circle><path d="M22.9360352 15h54.8070373l-4.3391876 30H30.3387146L19.6676025 0H.99560547"></path></g></svg></div> Hiện chưa có sản phẩm</div></div>'
                );
                jQuery(".siteCart-mobile").removeClass("show-cart");
                jQuery("body")
                    .removeClass("mainBody-mbcart")
                    .removeClass("body-showcart");
            }
        });

        if (check == undefined && jQuery(window).width() > 992) {
            if (!$(".header-action_cart").hasClass("js-action-show")) {
                $("body").removeClass("locked-scroll");
                $(".header-action").removeClass("js-action-show");
            }
            if ($("#site-header").hasClass("hSticky")) {
                $("#site-header").addClass("hSticky-nav");
                setTimeout(function () {
                    $("#site-header").addClass("hSticky-up");
                }, 300);
                setTimeout(function () {
                    $(".header-action_cart").addClass("js-action-show");
                    $("body").addClass("locked-scroll");
                }, 500);
            } else {
                $(".header-action_cart").addClass("js-action-show");
                $("body").addClass("locked-scroll");
                jQuery("html, body").animate(
                    {
                        scrollTop: 0,
                    },
                    600
                );
            }
        }
    },
    clone_item: function (product, i) {
        if (
            $(window).width() < 992 ||
            window.template.indexOf("collection.mini") > -1
        ) {
            var item_product = jQuery(
                ".siteCart-mobile .sitenav-cart .table-clone-cart"
            )
                .find(".mini-cart__item")
                .clone();
        } else {
            var item_product = jQuery(
                ".header-action_cart .sitenav-cart .table-clone-cart"
            )
                .find(".mini-cart__item")
                .clone();
        }
        if (product.image == null) {
            item_product
                .find("img")
                .attr(
                    "src",
                    "//theme.hstatic.net/200000258387/1000809443/14/no_image.jpg?v=155"
                )
                .attr("alt", product.url);
        } else {
            item_product
                .find("img")
                .attr("src", Haravan.resizeImage(product.image, "small"))
                .attr("alt", product.url);
        }
        item_product
            .find(".mnc-link")
            .attr("href", product.url)
            .attr("title", product.url);
        item_product.find(".mini-cart__title .mnc-title").html(product.title);
        item_product.find(".mini-cart__quantity .mnc-value").val(product.quantity);
        item_product
            .find(".mini-cart__price .mnc-price")
            .html(Haravan.formatMoney(product.price, formatMoney));
        item_product
            .find(".mini-cart__remove")
            .html(
                '<a href="javascript:void(0);" onclick="HRT.All.deleteCart(' +
                (i + 1) +
                "," +
                product.variant_id +
                ')" ><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"> <g><path d="M500,442.7L79.3,22.6C63.4,6.7,37.7,6.7,21.9,22.5C6.1,38.3,6.1,64,22,79.9L442.6,500L22,920.1C6,936,6.1,961.6,21.9,977.5c15.8,15.8,41.6,15.8,57.4-0.1L500,557.3l420.7,420.1c16,15.9,41.6,15.9,57.4,0.1c15.8-15.8,15.8-41.5-0.1-57.4L557.4,500L978,79.9c16-15.9,15.9-41.5,0.1-57.4c-15.8-15.8-41.6-15.8-57.4,0.1L500,442.7L500,442.7z"/></g> </svg></a>'
            );
        var title = "";
        if (product.variant_options.indexOf("Default Title") == -1) {
            $.each(product.variant_options, function (i, v) {
                title = title + v + " / ";
            });
            title = title + "@@";
            title = title.replace(" / @@", "");
            item_product.find(".mnc-variant").html(title);
        } else {
            item_product.find(".mnc-variant").html("");
        }
        if (
            $(window).width() < 992 ||
            window.template.indexOf("collection.mini") > -1
        ) {
            $(".siteCart-mobile .cart-view-render").append(
                item_product.removeClass("hidden")
            );
        } else {
            $(".header-action_cart .cart-view-render").append(
                item_product.removeClass("hidden")
            );
        }
        if (product.price == 0 && promotionApp) {
            item_product.find("button.qty-btn").hide();
            item_product.find(".qty-value").addClass("qty-value-app");
        }
    },
    deleteCart: function (line, variant_id) {
        var params = {
            type: "POST",
            url: "/cart/change.js",
            data: "quantity=0&line=" + line,
            dataType: "json",
            success: function (cart) {
                HRT.All.getCartModal(false);
                $(
                    '.proloop--action[data-vrid="' + variant_id + '"] .proloop-qtyvalue'
                ).val(0);
                $(
                    '.proloop--action[data-vrid="' + variant_id + '"] .action-boxqty'
                ).addClass("d-none");
                $('.proloop--action[data-vrid="' + variant_id + '"]').removeClass(
                    "action-count"
                );
                setTimeout(function () {
                    $(
                        '.proloop--action[data-vrid="' + variant_id + '"] .action-boxqty'
                    ).removeClass("d-none");
                }, 500);
            },
            error: function (XMLHttpRequest, textStatus) {
                Haravan.onError(XMLHttpRequest, textStatus);
            },
        };
        jQuery.ajax(params);
    },
    updateCart: function () {
        jQuery(document).on("click", "#update-cart-modal", function (event) {
            event.preventDefault();
            if (jQuery("#cartform").serialize().length <= 5) return;
            jQuery(this).html("Đang cập nhật");
            var params = {
                type: "POST",
                url: "/cart/update.js",
                data: jQuery("#cartform").serialize(),
                dataType: "json",
                success: function (cart) {
                    if (typeof callback === "function") {
                        callback(cart);
                    } else {
                        HRT.All.getCartModal();
                    }
                    jQuery("#update-cart-modal").html("Cập nhật");
                },
                error: function (XMLHttpRequest, textStatus) {
                    Haravan.onError(XMLHttpRequest, textStatus);
                },
            };
            jQuery.ajax(params);
        });
    },
    addItemShowModalCart: function (id) {
        if (check_show_modal) {
            check_show_modal = false;
            timeOut_modalCart = setTimeout(function () {
                check_show_modal = true;
            }, 1000);
            if ($(".addtocart-modal").hasClass("clicked_buy")) {
                var quantity = $("#quantity").val();
            } else {
                var quantity = 1;
            }
            var params = {
                type: "POST",
                url: "/cart/add.js",
                async: false,
                data: "quantity=" + quantity + "&id=" + id,
                dataType: "json",
                success: function (line_item) {
                    HRT.All.getCartModal();
                    $(".addtocart-modal").removeClass("clicked_buy");
                },
                error: function (XMLHttpRequest, textStatus) {
                    alert("Sản phẩm bạn vừa mua đã vượt quá tồn kho");
                },
            };
            jQuery.ajax(params);
        }
    },
    plusQuantity: function () {
        if (jQuery('input[name="quantity"]').val() != undefined) {
            var currentVal = parseInt(jQuery('input[name="quantity"]').val());
            if (!isNaN(currentVal)) {
                jQuery('input[name="quantity"]').val(currentVal + 1);
            } else {
                jQuery('input[name="quantity"]').val(1);
            }
        } else {
            console.log(
                "error: Not see elemnt " + jQuery('input[name="quantity"]').val()
            );
        }
    },
    minusQuantity: function () {
        if (jQuery('input[name="quantity"]').val() != undefined) {
            var currentVal = parseInt(jQuery('input[name="quantity"]').val());
            if (!isNaN(currentVal) && currentVal > 1) {
                jQuery('input[name="quantity"]').val(currentVal - 1);
            }
        } else {
            console.log(
                "error: Not see elemnt " + jQuery('input[name="quantity"]').val()
            );
        }
    },
    buyNowProdItem: function (id) {
        var quantity = 1;
        var params = {
            type: "POST",
            url: "/cart/add.js",
            data: "quantity=" + quantity + "&id=" + id,
            dataType: "json",
            success: function (line_item) {
                if (template == "cart") {
                    var x = $(".layout-cart").offset().top;
                    smoothScroll(x - 100, 500);
                    setTimeout(function () {
                        window.location.reload();
                    }, 300);
                } else {
                    $.get("/cart.js").done(function (cart) {
                        if (priceMin != "") {
                            if (priceMin > cart.total_price / 100) {
                                HRT.All.getCartModal();
                            } else {
                                window.location = "/checkout";
                            }
                        } else {
                            window.location = "/checkout";
                        }
                    });
                }
            },
            error: function (XMLHttpRequest, textStatus) {
                Haravan.onError(XMLHttpRequest, textStatus);
            },
        };
        jQuery.ajax(params);
    },
    addCartProdItem: function (id) {
        if (promotionApp) {
            if (
                !$('.product-loop[data-id="' + id + '"]')
                    .find(".gift.product_gift_label")
                    .hasClass("hidden") &&
                !$('.prodloop-block[data-id="' + id + '"]')
                    .find(".gift.product_gift_label")
                    .hasClass("hidden")
            )
                window.location.href =
                    $('.product-loop[data-id="' + id + '"]')
                        .find("a")
                        .attr("href") ||
                    $('.prodloop-block[data-id="' + id + '"]')
                        .find("a")
                        .attr("href");
            else {
                var min_qty = 1;
                var variant_id = $(this).attr("data-variantid");
                var params = {
                    type: "POST",
                    url: "/cart/add.js",
                    async: true,
                    data: "quantity=" + min_qty + "&id=" + id,
                    dataType: "json",
                    success: function (line_item) {
                        if (template.indexOf("cart") > -1) {
                            window.location.reload();
                        } else {
                            var image = "";
                            if (line_item["image"] == null) {
                                image = "https://hstatic.net/0/0/global/noDefaultImage6.gif";
                            } else {
                                image = Haravan.resizeImage(line_item["image"], "small");
                            }
                            var $info =
                                '<div class="row"><div class="col-md-12 col-xs-12"><p class="jGowl-text">Đã thêm vào giỏ hàng thành công!</p></div><div class="col-md-4 col-xs-4"><a href="' +
                                line_item["url"] +
                                '"><img width="70px" src="' +
                                image +
                                '" alt="' +
                                line_item["title"] +
                                '"/></a></div><div class="col-md-8 col-xs-8"><div class="jGrowl-note"><a class="jGrowl-title" href="' +
                                line_item["url"] +
                                '">' +
                                line_item["title"] +
                                "</a><ins>" +
                                Haravan.formatMoney(line_item["price"], formatMoney) +
                                "</ins></div></div></div>";
                            HRT.All.notifyProduct($info);
                            $(
                                '.proloop--action[data-vrid="' + id + '"] .proloop-qtyvalue'
                            ).val(line_item.quantity);
                            HRT.All.getCartModal(false);
                        }
                        $(".proloop--action[data-vrid=" + id + "]").addClass(
                            "action-count"
                        );
                    },
                    error: function (XMLHttpRequest, textStatus) {
                        //Haravan.onError(XMLHttpRequest, textStatus);
                        alert("Sản phẩm bạn vừa mua đã vượt quá tồn kho");
                    },
                };
                if (
                    jQuery(window).width() < 768 &&
                    $('.product-loop[data-id="' + id + '"] .add-to-cart').hasClass(
                        "btn-addcart-view"
                    )
                ) {
                    if (template.indexOf("product") > -1) {
                        window.location.href = $(
                            '.product-loop[data-id="' + id + '"] .proloop-image .proloop-link'
                        ).attr("href");
                    } else {
                        $(
                            '.product-loop[data-id="' +
                            id +
                            '"] .proloop-image .quickview-product'
                        ).click();
                    }
                } else {
                    jQuery.ajax(params);
                }
            }
        } else {
            var min_qty = 1;
            var variant_id = $(this).attr("data-variantid");
            var params = {
                type: "POST",
                url: "/cart/add.js",
                async: true,
                data: "quantity=" + min_qty + "&id=" + id,
                dataType: "json",
                success: function (line_item) {
                    if (template.indexOf("cart") > -1) {
                        window.location.reload();
                    } else {
                        var image = "";
                        if (line_item["image"] == null) {
                            image = "https://hstatic.net/0/0/global/noDefaultImage6.gif";
                        } else {
                            image = Haravan.resizeImage(line_item["image"], "small");
                        }
                        var $info =
                            '<div class="row"><div class="col-md-12 col-xs-12"><p class="jGowl-text">Đã thêm vào giỏ hàng thành công!</p></div><div class="col-md-4 col-xs-4"><a href="' +
                            line_item["url"] +
                            '"><img width="70px" src="' +
                            image +
                            '" alt="' +
                            line_item["title"] +
                            '"/></a></div><div class="col-md-8 col-xs-8"><div class="jGrowl-note"><a class="jGrowl-title" href="' +
                            line_item["url"] +
                            '">' +
                            line_item["title"] +
                            "</a><ins>" +
                            Haravan.formatMoney(line_item["price"], formatMoney) +
                            "</ins></div></div></div>";
                        HRT.All.notifyProduct($info);
                        $('.proloop--action[data-vrid="' + id + '"] .proloop-qtyvalue').val(
                            line_item.quantity
                        );
                        HRT.All.getCartModal(false);
                    }
                    $(".proloop--action[data-vrid=" + id + "]").addClass("action-count");
                },
                error: function (XMLHttpRequest, textStatus) {
                    Haravan.onError(XMLHttpRequest, textStatus);
                },
            };
            if (
                jQuery(window).width() < 768 &&
                $('.product-loop[data-id="' + id + '"] .add-to-cart').hasClass(
                    "btn-addcart-view"
                )
            ) {
                if (template.indexOf("product") > -1) {
                    window.location.href = $(
                        '.product-loop[data-id="' + id + '"] .proloop-image .proloop-link'
                    ).attr("href");
                } else {
                    $(
                        '.product-loop[data-id="' +
                        id +
                        '"] .proloop-image .quickview-product'
                    ).click();
                }
            } else {
                jQuery.ajax(params);
            }
        }
    },
    plusQtyProdItem: function (id) {
        if (promotionApp) {
            if (
                !$('.product-loop[data-id="' + id + '"]')
                    .find(".gift.product_gift_label")
                    .hasClass("hidden") &&
                !$('.prodloop-block[data-id="' + id + '"]')
                    .find(".gift.product_gift_label")
                    .hasClass("hidden")
            )
                window.location.href =
                    $('.product-loop[data-id="' + id + '"]')
                        .find("a")
                        .attr("href") ||
                    $('.prodloop-block[data-id="' + id + '"]')
                        .find("a")
                        .attr("href");
            else {
                if (jQuery('input[name="quantity-proloop"]').val() != undefined) {
                    var input = $(".proloop--action[data-vrid=" + id + "]").find(
                        ".proloop-boxqty input"
                    );
                    var currentVal = parseInt(input.val());
                    var newQty = 1;
                    if (!isNaN(currentVal)) {
                        input.val(currentVal + 1);
                        newQty = currentVal + 1;
                    } else {
                        input.val(1);
                    }
                    var params = {
                        type: "POST",
                        url: "/cart/update.js",
                        async: true,
                        data: "quantity=" + newQty + "&id=" + id,
                        dataType: "json",
                        success: function (line_item) {
                            if (template.indexOf("cart") > -1) {
                                window.location.reload();
                            } else {
                                HRT.All.getCartModal(false);
                            }
                        },
                        error: function (XMLHttpRequest, textStatus) {
                            Haravan.onError(XMLHttpRequest, textStatus);
                        },
                    };
                    jQuery.ajax(params);
                } else {
                    console.log(
                        "error: Not see elemnt " + jQuery('input[name="quantity"]').val()
                    );
                }
            }
        } else {
            if (jQuery('input[name="quantity-proloop"]').val() != undefined) {
                var input = $(".proloop--action[data-vrid=" + id + "]").find(
                    ".proloop-boxqty input"
                );
                var currentVal = parseInt(input.val());
                var newQty = 1;
                if (!isNaN(currentVal)) {
                    input.val(currentVal + 1);
                    newQty = currentVal + 1;
                } else {
                    input.val(1);
                }
                var params = {
                    type: "POST",
                    url: "/cart/update.js",
                    async: true,
                    data: "quantity=" + newQty + "&id=" + id,
                    dataType: "json",
                    success: function (line_item) {
                        if (template.indexOf("cart") > -1) {
                            window.location.reload();
                        } else {
                            HRT.All.getCartModal(false);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus) {
                        Haravan.onError(XMLHttpRequest, textStatus);
                    },
                };
                jQuery.ajax(params);
            } else {
                console.log(
                    "error: Not see elemnt " + jQuery('input[name="quantity"]').val()
                );
            }
        }
    },
    minusQtyProdItem: function (id) {
        if (jQuery('input[name="quantity-proloop"]').val() != undefined) {
            var input = $(".proloop--action[data-vrid=" + id + "]").find(
                ".proloop-boxqty input"
            );
            var currentVal = parseInt(input.val());
            var newQty = 1;
            if (!isNaN(currentVal) && currentVal >= 1) {
                input.val(currentVal - 1);
                newQty = currentVal - 1;
                var params = {
                    type: "POST",
                    url: "/cart/update.js",
                    async: true,
                    data: "quantity=" + newQty + "&id=" + id,
                    dataType: "json",
                    success: function (line_item) {
                        if (template.indexOf("cart") > -1) {
                            window.location.reload();
                        } else {
                            HRT.All.getCartModal(false);
                            if (newQty <= 0) {
                                $(
                                    '.proloop--action[data-vrid="' + id + '"] .action-boxqty'
                                ).addClass("d-none");
                                $('.proloop--action[data-vrid="' + id + '"]').removeClass(
                                    "action-count"
                                );
                                setTimeout(function () {
                                    $(
                                        '.proloop--action[data-vrid="' + id + '"] .action-boxqty'
                                    ).removeClass("d-none");
                                }, 500);
                            }
                        }
                    },
                    error: function (XMLHttpRequest, textStatus) {
                        Haravan.onError(XMLHttpRequest, textStatus);
                    },
                };
                jQuery.ajax(params);
            }
        } else {
            console.log(
                "error: Not see elemnt " + jQuery('input[name="quantity"]').val()
            );
        }
    },
    boxAccount: function (type) {
        $(
            ".site_account .site_account_panel_list .site_account_panel "
        ).removeClass("is-selected");
        var newheight = $(
            ".site_account .site_account_panel_list .site_account_panel#" + type
        )
            .addClass("is-selected")
            .height();
        if ($(".site_account_panel").hasClass("is-selected")) {
            $(".site_account_panel_list").css("height", newheight);
        }
    },
    smoothScroll: function (a, b) {
        $("body,html").animate(
            {
                scrollTop: a,
            },
            b
        );
    },
    FilterInput: function (event) {
        var keyCode = "which" in event ? event.which : event.keyCode;
        isNotWanted = keyCode == 69 || keyCode == 190 || keyCode == 189;
        return !isNotWanted;
    },
    handlePaste: function (e) {
        var clipboardData, pastedData;

        // Get pasted data via clipboard API
        clipboardData = e.clipboardData || window.clipboardData;
        pastedData = clipboardData.getData("Text").toUpperCase();

        if (pastedData.indexOf("E") > -1) {
            //alert('found an E');
            e.stopPropagation();
            e.preventDefault();
        }
    },
    checkemail: function (email) {
        var re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
};

HRT.Main = {
    init: function () {
        var that = this;
        that.topbarSlideText();
        that.scrollFixedHeader();
        that.searchAutoHeader();
        that.toggleFooter();
        that.fixHeightProductResize();
        that.addThisIconShare();
        that.menuSidebar();
        that.mainMenuMobile();
        that.clickIconsHeader();
        that.boxAcountHeader();
        that.formAccountHeader();
        that.inventoryLocation();
        that.updateMiniCart();
    },
    topbarSlideText: function () {
        if ($(".topbar-slideText").length > 0) {
            var checkItem = $(".topbar-slideText .discount").length;
            $(".topbar-slideText").owlCarousel({
                items: 1,
                dots: false,
                nav: checkItem > 1 ? true : false,
                loop: checkItem > 1 ? true : false,
                autoplay: true,
                autoplayTimeout: 5000,
                slideSpeed: 4000,
                animateIn: "flipInX",
                onTranslated: setOwlStageHeight,
                onInitialized: setOwlStageHeight,
                onRefreshed: setOwlStageHeight,
            });

            function setOwlStageHeight(event) {
                var maxHeight = 0;
                $(".topbar-slideText .owl-item").each(function () {
                    var thisHeight = parseInt($(this).height());
                    maxHeight = maxHeight >= thisHeight ? maxHeight : thisHeight;
                });
                $(".topbar-slideText.owl-carousel").css("height", maxHeight);
                $(".topbar-slideText.owl-carousel .owl-item .discount").css(
                    "height",
                    maxHeight
                );
            }

            $(".topbar-slideText").find(".owl-next").html("");
            $(".topbar-slideText").find(".owl-prev").html("");
        }
    },
    scrollFixedHeader: function () {
        var $parentHeader = $(".mainHeader--height");
        var parentHeight = $parentHeader.find(".mainHeader").outerHeight();
        var $header = $(".mainHeader");
        var offset_sticky_header = $header.outerHeight() + 100;
        var offset_sticky_down = 0;

        $parentHeader.css("min-height", parentHeight);
        var resizeTimer = false,
            resizeWindow = $(window).prop("innerWidth");
        $(window).on("resize", function () {
            if (resizeTimer) {
                clearTimeout(resizeTimer);
            }
            resizeTimer = setTimeout(function () {
                var newWidth = $(window).prop("innerWidth");
                if (resizeWindow != newWidth) {
                    $header
                        .removeClass("hSticky-up")
                        .removeClass("hSticky-nav")
                        .removeClass("hSticky");
                    $parentHeader.css("min-height", "");
                    resizeTimer = setTimeout(function () {
                        parentHeight = $parentHeader.find(".mainHeader").outerHeight();
                        $parentHeader.css("min-height", parentHeight);
                    }, 50);
                    resizeWindow = newWidth;
                }
            }, 200);
        });
        setTimeout(function () {
            $parentHeader.css("min-height", "");
            parentHeight = $parentHeader.find(".mainHeader").outerHeight();
            $parentHeader.css("min-height", parentHeight);
            jQuery(window).scroll(function () {
                /* scroll header */
                if (
                    jQuery(window).scrollTop() > offset_sticky_header &&
                    jQuery(window).scrollTop() > offset_sticky_down
                ) {
                    if (jQuery(window).width() > 991) {
                        if (!$("body").hasClass("location-noscroll")) {
                            $("body").removeClass("locked-scroll");
                            $(".header-action-item").removeClass("js-action-show");
                        }
                    }
                    $header.addClass("hSticky");
                    if (jQuery(window).scrollTop() > offset_sticky_header + 150) {
                        $header.removeClass("hSticky-up").addClass("hSticky-nav");
                    }
                } else {
                    if (
                        jQuery(window).scrollTop() > offset_sticky_header &&
                        jQuery(window).scrollTop() + 450 + jQuery(window).height() <
                        $(document).height()
                    ) {
                        $header.addClass("hSticky-up");
                    }
                }
                if (
                    jQuery(window).scrollTop() <= offset_sticky_down &&
                    jQuery(window).scrollTop() <= offset_sticky_header
                ) {
                    $header.removeClass("hSticky-up").removeClass("hSticky-nav");
                    if (jQuery(window).scrollTop() <= offset_sticky_header - 100) {
                        $header.removeClass("hSticky");
                    }
                }
                offset_sticky_down = jQuery(window).scrollTop();
            });
        }, 300);
    },
    searchAutoHeader: function () {
        $(".ultimate-search").submit(function (e) {
            e.preventDefault();
            var q = $(this).find("input[name=q]").val();
            if (q.indexOf("script") > -1 || q.indexOf(">") > -1) {
                alert(
                    "Từ khóa của bạn có chứa mã độc hại ! Vui lòng nhập lại từ khóa khác"
                );
                $(this).find("input[name=q]").val("");
            } else {
                var q_follow = "product";
                var query = encodeURIComponent(q);
                if (!q) {
                    window.location = "/search?type=" + q_follow + "&q=";
                    return;
                } else {
                    window.location = "/search?type=" + q_follow + "&q=" + query;
                    return;
                }
            }
        });
        var $input = $('.ultimate-search input[type="text"]');
        $input.bind(
            "keyup change paste propertychange",
            delayTime(function () {
                var key = $(this).val(),
                    $parent = $(this).parents(".wpo-wrapper-search"),
                    $results = $(this)
                        .parents(".wpo-wrapper-search")
                        .find(".smart-search-wrapper");
                if (key.indexOf("script") > -1 || key.indexOf(">") > -1) {
                    alert(
                        "Từ khóa của bạn có chứa mã độc hại! Vui lòng nhập lại từ khóa khác"
                    );
                    $(this).val("");
                    $('.ultimate-search input[type="text"]').val("");
                } else {
                    if (key.length > 0) {
                        $(this).attr("data-history", key);
                        $('.ultimate-search input[type="text"]').val($(this).val());
                        var q_follow = "product",
                            str = "";
                        str = "/search?type=product&q=" + key + "&view=ultimate-product";
                        $.ajax({
                            url: str,
                            type: "GET",
                            async: true,
                            success: function (data) {
                                $results
                                    .find(".resultsContent")
                                    .html(data)
                                    .addClass("resultsdata");
                            },
                        });
                        if (!$(".header-action_search").hasClass("js-action-show")) {
                            $("body").removeClass("locked-scroll");
                            $(".header-action-item").removeClass("js-action-show");
                        }
                        $(".ultimate-search").addClass("expanded");
                        $results.fadeIn();
                    } else {
                        $('.ultimate-search input[type="text"]').val($(this).val());
                        $(".ultimate-search").removeClass("expanded");
                        if ($(".search-suggest").length > 0) {
                            $results.fadeIn();
                            $results
                                .find(".resultsContent")
                                .html("")
                                .removeClass("resultsdata");
                        } else {
                            $results.find(".resultsContent").html("");
                            $results.fadeOut();
                        }
                    }
                }
            }, 500)
        );
        $("body").click(function (evt) {
            var target = evt.target;
            if (
                target.id !== "ajaxSearchResults" &&
                target.id !== "inputSearchAuto"
            ) {
                $("#ajaxSearchResults").hide();
            }
            if (
                target.id !== "ajaxSearchResults-mb" &&
                target.id !== "inputSearchAuto-mb"
            ) {
                $("#ajaxSearchResults-mb").hide();
            }
            if (
                target.id !== "ajaxSearchResults-3" &&
                target.id !== "inputSearchAuto-3"
            ) {
                $("#ajaxSearchResults-3").hide();
            }
        });
        $("body").on("click", '.ultimate-search input[type="text"]', function () {
            if ($(".search-suggest").length > 0) {
                $(".ajaxSearchResults").show();
                $(".ajaxSearchResults")
                    .find(".search-suggest")
                    .addClass("show-suggest");
            } else {
                if ($(this).is(":focus")) {
                    if ($(this).val() != "") {
                        $(".ajaxSearchResults").show();
                    }
                }
            }
        });
        $("body").on("click", ".ultimate-search .search-close", function (e) {
            e.preventDefault();
            $(".ajaxSearchResults").hide();
            $(".ultimate-search").removeClass("expanded");
            $(".ultimate-search").find("input[name=q]").val("");
        });
        /* width search templae 3 */
        /*if($('.mainHeader_temp03').length > 0 ){
			var $parentForm = $('.mainHeader_temp03');
			var width = parseInt($parentForm.find(".header-wrap-action .header-action_locale").outerWidth() + $parentForm.find(".header-wrap-action .header-action_account").outerWidth() + 10 )
			if ($('.search-suggest').length > 0){
				$('.header-wrap-search .searchform-categoris .input-search').focusout(function() {
				$parentForm.find(".header-wrap-search .header-search .searchform-product").css("width", "100% ");
				}).focusin(function() {
				$parentForm.find(".header-wrap-search .header-search .searchform-product").css("width", "calc(100% + " + width + "px)");
				});
			}
		}*/
    },
    toggleFooter: function () {
        $(".footer-call-center .expand-title").on("click", function () {
            jQuery(this)
                .toggleClass("active")
                .parents(".footer-container")
                .find(".footer-expand-collapsed")
                .slideToggle("");
            $("body,html").animate(
                {
                    scrollTop: $(".footer-call-center").position().top,
                },
                600
            );
        });
        $(".title-footer").on("click", function () {
            if ($(window).width() < 992) {
                jQuery(this)
                    .toggleClass("opened")
                    .parent()
                    .find(".block-collapse")
                    .stop()
                    .slideToggle("medium");
            }
        });
    },
    fixHeightProductResize: function () {
        var wdWidth = $(window).outerWidth();
        document.addEventListener("lazyloaded", function (e) {
            HRT.All.fixHeightProduct(
                ".listProduct-resize",
                ".product-resize",
                ".image-resize"
            );
            jQuery(window).resize(function () {
                var wdOldWidth = $(window).prop("innerWidth");
                if (wdOldWidth != wdWidth) {
                    HRT.All.fixHeightProduct(
                        ".listProduct-resize",
                        ".product-resize",
                        ".image-resize"
                    );
                    wdOldWidth = wdWidth;
                }
            });
        });
    },
    addThisIconShare: function () {
        if ($(".addThis_listSharing").length > 0) {
            $(".addThis_iconContact,.addThis_listSharing .addThis_close").on(
                "click",
                function (e) {
                    if ($(".addThis_listSharing").hasClass("active")) {
                        $(".addThis_listSharing").removeClass("active");
                        $(".addThis_listSharing").fadeOut(150);
                    } else {
                        $(".addThis_listSharing").fadeIn(100);
                        $(".addThis_listSharing").addClass("active");
                    }
                }
            );
            $(".listSharing_overlay").on("click", function (e) {
                $(".addThis_listSharing").removeClass("active");
                $(".addThis_listSharing").fadeOut(150);
            });
            $(".content_popupform form.contact-form").submit(function (e) {
                var self = $(this);
                if ($(this)[0].checkValidity() == true) {
                    e.preventDefault();
                    grecaptcha.ready(function () {
                        grecaptcha
                            .execute("6LdD18MUAAAAAHqKl3Avv8W-tREL6LangePxQLM-", {
                                action: "submit",
                            })
                            .then(function (token) {
                                self.find('input[name="g-recaptcha-response"]').val(token);
                                $.ajax({
                                    type: "POST",
                                    url: "/contact",
                                    data: $(".content_popupform form.contact-form").serialize(),
                                    beforeSend: function () {
                                        // addClass loading
                                    },
                                    success: function (data) {
                                        $(".modal-contactform.fade.in").modal("hide");
                                        setTimeout(function () {
                                            $(".modal-succesform").modal("show");
                                            setTimeout(function () {
                                                $(".modal-succesform.fade.in").modal("hide");
                                            }, 5000);
                                        }, 200);
                                    },
                                    complete: function () {
                                        // removeClass loading
                                    },
                                });
                            });
                    });
                }
            });
            $(".modal-succesform").on("hidden.bs.modal", function () {
                location.reload();
            });
        }
    },
    menuSidebar: function () {
        $(".plus-nClick1").click(function (e) {
            e.preventDefault();
            $(this).parents(".level0").toggleClass("opened");
            $(this).parents(".level0").children("ul").slideToggle(200);
        });
        $(".plus-nClick2").click(function (e) {
            e.preventDefault();
            $(this).parents(".level1").toggleClass("opened");
            $(this).parents(".level1").children("ul").slideToggle(200);
        });
        jQuery(".sidebox-title .htitle").click(function () {
            $(this)
                .parents(".group-sidebox")
                .toggleClass("is-open")
                .find(".sidebox-content-togged")
                .slideToggle("medium");
        });
    },
    mainMenuMobile: function () {
        $(document).on(
            "click",
            ".mobile-menu__linklists .has-subnav .link-parent",
            function (e) {
                e.preventDefault();
                if ($(this).parent().hasClass("parent-open")) {
                    $(this).parent().removeClass("parent-open");
                    $(this).siblings("ul").slideUp();
                } else {
                    if (
                        $(this).parent().hasClass("nav-level1") ||
                        $(this).parent().hasClass("nav-level2")
                    ) {
                        $(this).parent().siblings().find("ul").slideUp();
                        $(this).parent().siblings().removeClass("parent-open");
                    }
                    $(this).parent().addClass("parent-open");
                    $(this).siblings("ul").slideDown();
                }
            }
        );
    },
    clickIconsHeader: function () {
        $(".header-action_clicked").click(function (e) {
            e.preventDefault();
            if ($(this).parents(".header-action-item").hasClass("js-action-show")) {
                $("body")
                    .removeClass("locked-scroll-menu")
                    .removeClass("locked-scroll");
                $(this).parents(".header-action-item").removeClass("js-action-show");
                if ($(window).width() < 992) {
                    if (
                        $(this)
                            .parents(".header-action-item")
                            .hasClass("header-action_cart")
                    ) {
                        $(".siteCart-mobile__overlay").removeClass("show-cart");
                        $("body").removeClass("locked-scroll").removeClass("body-showcart");
                    }
                }
            } else {
                $("body").removeClass("locked-scroll-menu");
                $(".header-action-item").removeClass("js-action-show");
                $("body").addClass("locked-scroll");
                $(this).parents(".header-action-item").addClass("js-action-show");
                if (
                    $(this).parents(".header-action-item").hasClass("header-action_menu")
                ) {
                    $("body").addClass("locked-scroll-menu");
                }
                if ($(window).width() < 992) {
                    if (
                        $(this)
                            .parents(".header-action-item")
                            .hasClass("header-action_cart")
                    ) {
                        $(".siteCart-mobile").addClass("show-cart");
                        $("body").removeClass("locked-scroll").addClass("body-showcart");
                    }
                }
            }
        });
        $(".siteCart-mobile__header").click(function () {
            if ($(this).parents(".siteCart-mobile").hasClass("show-cart")) {
                $(this).parents(".siteCart-mobile").removeClass("show-cart");
                $("body").removeClass("locked-scroll").removeClass("body-showcart");
                $(".header-action-item.header-action_cart").removeClass(
                    "js-action-show"
                );
            } else {
                $("body").addClass("body-showcart");
                $(this).parents(".siteCart-mobile").addClass("show-cart");
            }
        });
        $(".siteCart-mobile__overlay").on("click", function (e) {
            $(this).parents(".siteCart-mobile").removeClass("show-cart");
            $("body").removeClass("locked-scroll").removeClass("body-showcart");
            $(".header-action-item.header-action_cart").removeClass("js-action-show");
        });
        $("body").on(
            "click",
            "#sitenav-overlay,.sitenav-content .btnclose",
            function (e) {
                $("body")
                    .removeClass("locked-scroll")
                    .removeClass("locked-scroll-menu");
                $(".header-action-item").removeClass("js-action-show");
            }
        );
    },
    boxAcountHeader: function () {
        $("body").on("click", ".js-link", function (e) {
            e.preventDefault();
            HRT.All.boxAccount($(this).attr("aria-controls"));
        });
        $(".site_account input").blur(function () {
            var tmpval = $(this).val();
            if (tmpval == "") {
                $(this).removeClass("is-filled");
            } else {
                $(this).addClass("is-filled");
            }
        });
    },
    formAccountHeader: function () {
        /* submit recapcha form */
        if ($("#header-login-panel").length > 0) {
            $("#header-login-panel form#customer_login").submit(function (e) {
                var self = $(this);
                if ($(this)[0].checkValidity() == true) {
                    e.preventDefault();
                    grecaptcha.ready(function () {
                        grecaptcha
                            .execute("6LdD18MUAAAAAHqKl3Avv8W-tREL6LangePxQLM-", {
                                action: "submit",
                            })
                            .then(function (token) {
                                self.find('input[name="g-recaptcha-response"]').val(token);
                                self.unbind("submit").submit();
                            });
                    });
                }
            });
        }
        if ($("#header-recover-panel").length > 0) {
            $("#header-recover-panel form").submit(function (e) {
                var self = $(this);
                if ($(this)[0].checkValidity() == true) {
                    e.preventDefault();
                    grecaptcha.ready(function () {
                        grecaptcha
                            .execute("6LdD18MUAAAAAHqKl3Avv8W-tREL6LangePxQLM-", {
                                action: "submit",
                            })
                            .then(function (token) {
                                self.find('input[name="g-recaptcha-response"]').val(token);
                                self.unbind("submit").submit();
                            });
                    });
                }
            });
        }
    },
    inventoryLocation: function () {
        if (
            $(".header-action_locale").length > 0 ||
            $(".header-market").length > 0
        ) {
            if (
                localStorage.my_location != null &&
                localStorage.my_location != undefined
            ) {
                $(
                    ".locationContainer .header-action_dropdown .chooseLocation span"
                ).text(localStorage.my_location);
                $(
                    ".locationContainer .header-action_dropdown .chooseLocation span"
                ).attr("data-id", localStorage.location_id);
                $(".locationContainer .header-action__link .shiptoHere").html(
                    '<span class="txt-overflow">' + localStorage.my_location + "</span>"
                );
                if (window.template.indexOf("collection.mini") > -1) {
                    $(".header-market .store-name span").text(localStorage.my_location);
                }
                if (cartGet != null && cartGet.location_id == null) {
                    $.post("/location.js?locationId=" + localStorage.location_id).done(
                        function (data) {
                            if (data.error == false) {
                                window.location.reload();
                            }
                        }
                    );
                }
            } else {
                var txtAddress = $(
                    ".locationContainer .header-action_dropdown .chooseLocation span"
                ).text();
                var idAddress = $(
                    ".locationContainer .header-action_dropdown .chooseLocation span"
                ).data("id");
                var provinceAddress = $(
                    ".locationContainer .header-action_dropdown .chooseLocation span"
                ).data("province");
                if (window.template.indexOf("collection.mini") > -1) {
                    txtAddress = $(".header-store .store-choose").data("store");
                    idAddress = $(".header-store .store-choose").data("id");
                    provinceAddress = $(".header-store .store-choose").data("province");
                }
                $(".locationContainer .header-action__link .shiptoHere").html(
                    '<span class="txt-overflow">' + txtAddress + "</span>"
                );
                $(".header-market .store-name span").html(
                    '<span class="txt-overflow">' + txtAddress + "</span>"
                );
                if (window.template.indexOf("collection.mini") > -1) {
                    setTimeout(function () {
                        $(".header-store .store-choose").trigger("click");
                    }, 300);
                } else {
                    if (locationHeader) {
                        $("body").addClass("location-noscroll");
                        $(".header-action_locale .header-action_text").addClass("overlays");
                        setTimeout(function () {
                            $("#site-locale-handle").trigger("click");
                        }, 600);
                    } else {
                        localStorage.my_location = txtAddress;
                        localStorage.location_id = idAddress;
                        localStorage.location_province = provinceAddress;
                        $.post("/location.js?locationId=" + localStorage.location_id).done(
                            function (data) {
                                if (data.error == false) {
                                    window.location.reload();
                                }
                            }
                        );
                    }
                }
            }
        }
        $(document).on(
            "click",
            ".listprov li,.location-stores .listshop li",
            function () {
                var mylocation = $(this).text(),
                    mylocation_id = $(this).data("id"),
                    mylocation_province = $(this).data("province");
                localStorage.my_location = mylocation;
                localStorage.location_id = mylocation_id;
                localStorage.location_province = mylocation_province;
                $(".header-action_locale .header-action_text").removeClass("overlays");
                $("body").removeClass("location-noscroll");
                $(
                    ".locationContainer .header-action_dropdown .chooseLocation span"
                ).text(mylocation);
                $(
                    ".locationContainer .header-action_dropdown .chooseLocation span"
                ).attr("data-id", mylocation_id);
                $(
                    ".locationContainer .header-action_dropdown .chooseLocation span"
                ).attr("data-province", mylocation_province);
                $(".locationContainer .header-action__link .shiptoHere")
                    .removeClass("hidden")
                    .html('<span class="txt-overflow">' + mylocation + "</span>");
                $("#site-locale-handle").trigger("click");
                $.post("/location.js?locationId=" + localStorage.location_id).done(
                    function (data) {
                        if (data.error == false) {
                            window.location.reload();
                        }
                    }
                );
            }
        );
        if ($(".sitenav-locate .boxfilter").length > 0) {
            var option_province = '<option value="null">- Chọn Tỉnh/Thành -</option>';
            var option_district = '<option value="null">- Chọn Quận/Huyện -</option>';
            $.each(newStore, function (i, v) {
                option_province += '<option value="' + i + '">' + i + "</option>";
            });
            $(".filter-province").html(option_province);
            $(".filter-district").html(option_district);
            $(".filter-province").change(function () {
                var province = $(this).val();
                var option_province_new =
                    '<option value="null">- Chọn Quận/Huyện -</option>';
                if (province != "null" && province != "") {
                    $('.listprov li[data-province!="' + province + '"]').hide();
                    $('.listprov li[data-province="' + province + '"]').show();
                    //localStorage.setItem('location_province',province);
                    if (newStore[province]) {
                        $.each(newStore[province], function (i, v) {
                            option_province_new +=
                                '<option value="' + i + '">' + i + "</option>";
                        });
                        $(".filter-district").html(option_province_new);
                    }
                } else {
                    $(".listprov li").show();
                }
            });
            $(".filter-district").change(function () {
                var district = $(this).val();
                var province = $(".filter-province").val();
                if (district != "null" && district != "") {
                    //localStorage.setItem('location_district',province);
                    $('.listprov li[data-district!="' + district + '"]').hide();
                    $('.listprov li[data-district="' + district + '"]').show();
                } else {
                    if (province != "null" && province != "") {
                        $('.listprov li[data-province!="' + province + '"]').hide();
                        $('.listprov li[data-province="' + province + '"]').show();
                    } else {
                        $(".listprov li").show();
                    }
                }
            });
            if (
                localStorage.location_province != null &&
                localStorage.location_province != undefined
            ) {
                $(".filter-province").val(localStorage.location_province).change();
            }
        }
        if (window.template.indexOf("collection.mini") > -1) {
            var option_province = '<option value="null">- Chọn Tỉnh/Thành -</option>';
            var option_district = '<option value="null">- Chọn Quận/Huyện -</option>';
            $.each(newStore, function (i, v) {
                option_province += '<option value="' + i + '">' + i + "</option>";
            });
            $("#prov-sel").html(option_province);
            $("#dist-sel").html(option_district);
            $("#prov-sel").change(function () {
                var province = $(this).val();
                var option_province_new =
                    '<option value="null">- Chọn Quận/Huyện -</option>';
                if (province != "null" && province != "") {
                    $('.listshop li[data-province!="' + province + '"]').hide();
                    $('.listshop li[data-province="' + province + '"]').show();
                    //localStorage.setItem('location_province',province);
                    if (newStore[province]) {
                        $.each(newStore[province], function (i, v) {
                            option_province_new +=
                                '<option value="' + i + '">' + i + "</option>";
                        });
                        $("#dist-sel").html(option_province_new);
                    }
                } else {
                    $(".listshop li").show();
                }
            });
            $("#dist-sel").change(function () {
                var district = $(this).val();
                var province = $("#prov-sel").val();
                if (district != "null" && district != "") {
                    //localStorage.setItem('location_district',province);
                    $('.listshop li[data-district!="' + district + '"]').hide();
                    $('.listshop li[data-district="' + district + '"]').show();
                } else {
                    if (province != "null" && province != "") {
                        $('.listshop li[data-province!="' + province + '"]').hide();
                        $('.listshop li[data-province="' + province + '"]').show();
                    } else {
                        $(".listshop li").show();
                    }
                }
            });
            if (
                localStorage.location_province != null &&
                localStorage.location_province != undefined
            ) {
                $("#prov-sel").val(localStorage.location_province).change();
            }
            /* modal location */
            $(".store-choose").on("click", function (e) {
                e.preventDefault();
                if ($(this).hasClass("open")) {
                    $(".location-stores").removeClass("open-locate");
                    $(this).removeClass("open");
                    $(".location-stores").fadeOut(200);
                    $(".template-collection-mini").removeClass("no-scroll");
                } else {
                    $(this).addClass("open");
                    $(".location-stores").fadeIn(200);
                    $(".location-stores").addClass("open-locate");
                    $(".template-collection-mini").addClass("no-scroll");
                }
            });
            $(".local-close").on("click", function (e) {
                if (
                    localStorage.my_location != null &&
                    localStorage.my_location != undefined
                ) {
                    $(".location-stores").removeClass("open-locate");
                    $(".store-choose").removeClass("open");
                    $(".location-stores").fadeOut(200);
                    $(".template-collection-mini").removeClass("no-scroll");
                } else {
                    var txtAddress = $(".header-store .store-choose").data("store");
                    var idAddress = $(".header-store .store-choose").data("id");
                    var provinceAddress = $(".header-store .store-choose").data(
                        "province"
                    );
                    localStorage.my_location = txtAddress;
                    localStorage.location_id = idAddress;
                    localStorage.location_province = provinceAddress;
                    $.post("/location.js?locationId=" + localStorage.location_id).done(
                        function (data) {
                            if (data.error == false) {
                                window.location.reload();
                            } else {
                                $(".location-stores").removeClass("open-locate");
                                $(".store-choose").removeClass("open");
                                $(".location-stores").fadeOut(200);
                                $(".template-collection-mini").removeClass("no-scroll");
                            }
                        }
                    );
                }
            });
        }
    },
    updateMiniCart: function () {
        $(document).on("click", ".mini-cart__quantity .mnc-plus", function (e) {
            e.preventDefault();
            var line = $(this).parents(".mini-cart__item").index() + 1;
            var currentQty = parseInt(
                $(this).parents(".mini-cart__item").find("input").val()
            );
            var newQty = currentQty + 1;
            $(this).parents(".mini-cart__item").find("input").val(newQty);
        });

        $(document).on("click", ".mini-cart__quantity .mnc-minus", function (e) {
            e.preventDefault();
            var line = $(this).parents(".mini-cart__item").index() + 1;
            var currentQty = parseInt(
                $(this).parents(".mini-cart__item").find("input").val()
            );
            if (currentQty > 1) {
                var newQty = currentQty - 1;
                $(this).parents(".mini-cart__item").find("input").val(newQty);
            }
        });

        $(document).on(
            "click",
            ".mini-cart__quantity .mnc-plus",
            delayTime(function () {
                var line = $(this).parents(".mini-cart__item").index() + 1;
                var currentQty = parseInt(
                    $(this).parents(".mini-cart__item").find("input").val()
                );
                var params = {
                    type: "POST",
                    url: "/cart/change.js",
                    data: "quantity=" + currentQty + "&line=" + line,
                    async: false,
                    dataType: "json",
                    success: function (data) {
                        var total_price = Haravan.formatMoney(
                            data.total_price,
                            formatMoney
                        );
                        $("#total-view-cart,.boxinfo.p-price,.mnc-total-price").html(
                            total_price
                        );
                        $(".count-holder .count").html(data.item_count);
                        $(".boxinfo.p-count").html(data.item_count + " sản phẩm");
                        for (i = 0; i < data.items.length; i++) {
                            var id = data.items[i].variant_id;
                            $('.proloop--action[data-vrid="' + id + '"]')
                                .find(".proloop-boxqty input")
                                .val(data.items[i].quantity);
                        }
                        if (priceMin != "") {
                            if (priceMin > data.total_price / 100) {
                                $(".linktocheckout").attr("href", "/cart");
                                $(".order-summary-block.order-summary-notify").removeClass(
                                    "hide"
                                );
                            } else {
                                $(".linktocheckout").attr("href", "/checkout");
                                $(".order-summary-block.order-summary-notify").addClass("hide");
                            }
                        }
                    },
                    error: function (XMLHttpRequest, textStatus) {
                        Haravan.onError(XMLHttpRequest, textStatus);
                    },
                };
                jQuery.ajax(params);
            }, 300)
        );

        $(document).on(
            "click",
            ".mini-cart__quantity .mnc-minus",
            delayTime(function () {
                var line = $(this).parents(".mini-cart__item").index() + 1;
                var currentQty = parseInt(
                    $(this).parents(".mini-cart__item").find("input").val()
                );
                if (currentQty > 0) {
                    var params = {
                        type: "POST",
                        url: "/cart/change.js",
                        data: "quantity=" + currentQty + "&line=" + line,
                        async: false,
                        dataType: "json",
                        success: function (data) {
                            /*HRT.All.getCartModal(false);*/

                            var total_price = Haravan.formatMoney(
                                data.total_price,
                                formatMoney
                            );
                            $("#total-view-cart,.boxinfo.p-price,.mnc-total-price").html(
                                total_price
                            );
                            $(".count-holder .count").html(data.item_count);
                            $(".boxinfo.p-count").html(data.item_count + " sản phẩm");
                            for (i = 0; i < data.items.length; i++) {
                                var id = data.items[i].variant_id;
                                $('.proloop--action[data-vrid="' + id + '"]')
                                    .find(".proloop-boxqty input")
                                    .val(data.items[i].quantity);
                            }
                            if (priceMin != "") {
                                if (priceMin > data.total_price / 100) {
                                    $(".linktocheckout").attr("href", "/cart");
                                    $(".order-summary-block.order-summary-notify").removeClass(
                                        "hide"
                                    );
                                } else {
                                    $(".linktocheckout").attr("href", "/checkout");
                                    $(".order-summary-block.order-summary-notify").addClass(
                                        "hide"
                                    );
                                }
                            }
                        },
                        error: function (XMLHttpRequest, textStatus) {
                            Haravan.onError(XMLHttpRequest, textStatus);
                        },
                    };
                    jQuery.ajax(params);
                }
            }, 300)
        );
    },
};

HRT.Index = {
    init: function () {
        var that = this;
        that.sliderBannerTop();
        that.newsletterForm();
        that.promotionCoupon();
        that.fixHeightCollectionIndex();
    },
    sliderBannerTop: function () {
        if ($("#home-slider").length > 0) {
            $("#home-slider .owl-carousel").owlCarousel({
                items: 1,
                nav: true,
                dots: true,
                lazyLoad: true,
                loop: $("#home-slider .slider-item").length > 1 ? true : false,
                autoplay: true,
                autoplayTimeout: 8000,
                slideSpeed: 4000,
                animateIn: "fadeIn",
                animateOut: "fadeOut",
                responsive: {
                    0: {
                        nav: false,
                    },
                    768: {
                        nav: true,
                    },
                },
                onChanged: function (event) {
                    setTimeout(function () {
                        $("#home-slider")
                            .find(".owl-dot")
                            .each(function (index) {
                                $(this).attr("aria-label", index + 1);
                            });
                    }, 400);
                },
            });
            $("#home-slider .owl-carousel").find(".owl-next").html("");
            $("#home-slider .owl-carousel").find(".owl-prev").html("");
        }
    },
    promotionCoupon: function () {
        $(document).on("click", ".promotion-item .btn-coupon", function (e) {
            e.preventDefault();
            $(".promotion-item .btn-coupon")
                .html("Sao chép mã")
                .removeClass("disabled");
            var copyText = $(this).attr("data-coupon");
            var el = document.createElement("textarea");
            el.value = copyText;
            el.setAttribute("readonly", "");
            el.style.position = "absolute";
            el.style.left = "-9999px";
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
            $(this).html("Đã sao chép").addClass("disabled");
        });
    },
    fixHeightCollectionIndex: function () {
        var windowWidth = $(window).outerWidth();
        $(document).on("lazyloaded", function (e) {
            $(".section-index-collection").each(function () {
                if ($(this).find(".listProduct-row").length > 0) {
                    var fixHeightParent =
                        '[data-feature="' + $(this).attr("data-feature") + '"]';
                    HRT.All.fixHeightProduct(
                        fixHeightParent,
                        ".product-resize",
                        ".image-resize"
                    );
                    jQuery(window).resize(function () {
                        var oldWindowWidth = $(window).prop("innerWidth");
                        if (oldWindowWidth != windowWidth) {
                            HRT.All.fixHeightProduct(
                                fixHeightParent,
                                ".product-resize",
                                ".image-resize"
                            );
                            oldWindowWidth = windowWidth;
                        }
                    });
                }
            });
        });
    },
    newsletterForm: function () {
        if ($(".newsletter-form").length > 0) {
            $(".newsletter-form form.contact-form").submit(function (e) {
                var self = $(this);
                if ($(this)[0].checkValidity() == true) {
                    e.preventDefault();
                    grecaptcha.ready(function () {
                        grecaptcha
                            .execute("6LdD18MUAAAAAHqKl3Avv8W-tREL6LangePxQLM-", {
                                action: "submit",
                            })
                            .then(function (token) {
                                self.find('input[name="g-recaptcha-response"]').val(token);
                                self.unbind("submit").submit();
                            });
                    });
                }
            });
        }
    },
};

HRT.Collection = {
    init: function () {
        var that = this;
    },
};

HRT.Product = {
    init: function () {
        var that = this;
        that.addCartProduct();
        //that.buyNowProduct();
        that.changeValueQuantity();
        that.backtoHistory();
        that.toggleDescProduct(".product-description--accordion");
        that.sliderProductRelated();
        that.toggleShareProduct();
        that.scrollCartMobile();
        that.renderCombo(currentId);
    },
    addCartProduct: function () {
        $("#add-to-cartBottom").click(function () {
            $("#add-to-cart").trigger("click");
        });
    },
    buyNowProduct: function () {
    },
    changeValueQuantity: function () {
        $("#quantity").on("keyup change", function () {
            $("#quantity-bottom").val($(this).val());
        });
        $("#quantity-bottom").on("keyup change", function () {
            $("#quantity").val($(this).val());
        });
    },
    backtoHistory: function () {
        if ($("#backto-page").length > 0) {
            $(document).on("click", "#backto-page", function () {
                window.history.back();
            });
        }
    },
    toggleDescProduct: function (object) {
        $(document).on("click", object + " .panel-group .panel-title", function () {
            if ($(this).parent().hasClass("opened")) {
                $(this).parent().removeClass("opened");
                $(this).parent().find(".panel-description").slideUp();
            } else {
                $(object).find(".panel-description").slideUp();
                $(object).find(".panel-group").removeClass("opened");
                $(this).parent().addClass("opened");
                $(this).parent().find(".panel-description").slideDown();
            }
        });
    },
    toggleShareProduct: function () {
        // click icon  share social product
        $(document).on("click", ".product-sharing", function () {
            $(this).toggleClass("sharing-active");
        });
    },
    copyLinkProduct: function () {
        var copyText = document.getElementById("myInput");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        $(".product-sharing .sharing__link")
            .find(".toollip-txt")
            .html("Đã sao chép");
    },
    sliderProductRelated: function () {
        if ($(".productDetail-listprod").length > 0) {
            $(".productDetail-listprod").each(function () {
                if ($(this).find(".owl-carousel").length > 0) {
                    var carouselParent = $(this).find(".owl-carousel");
                    carouselParent.owlCarousel({
                        items: 5,
                        nav: true,
                        dots: false,
                        loop: false,
                        lazyLoad: true,
                        smartSpeed: 1500,
                        autoplayTimeout: 1500,
                        responsive: {
                            0: {
                                items: 2,
                                stagePadding: 20,
                                margin: 5,
                            },
                            768: {
                                items: 3,
                                margin: 15,
                            },
                            992: {
                                items: 4,
                                margin: 15,
                            },
                            1200: {
                                items: 5,
                                margin: 15,
                            },
                        },
                    });
                }
            });
        }
    },
    scrollCartMobile: function () {
        if ($(".mainBody-product ").length > 0) {
            if (jQuery(window).width() < 768) {
                var curScrollTop = 0;
                $(window).scroll(function () {
                    var scrollTop = $(window).scrollTop();
                    if (scrollTop > curScrollTop && scrollTop > 200) {
                        $(".mainBody-product")
                            .removeClass("scroll-down")
                            .addClass("scroll-up");
                    } else {
                        if (
                            scrollTop > 200 &&
                            scrollTop + $(window).height() + 150 < $(document).height()
                        ) {
                            $(".mainBody-product")
                                .removeClass("scroll-up")
                                .addClass("scroll-down");
                        }
                    }
                    if (scrollTop < curScrollTop && scrollTop < 200) {
                        $(".mainBody-product")
                            .removeClass("scroll-up")
                            .removeClass("scroll-down");
                    }
                    curScrollTop = scrollTop;
                });
            }
        }
    },
    renderCombo: function (currentId, view) {
        var aIdCombo = [],
            aIdSearch = [],
            htmlCombo = "";
        var dataItemsCombo = [];

        function render_img(result, aIdCombo) {
            var htmlImg = "";
            var numIdCombo = aIdCombo.length - 1;
            htmlImg += '<div class="combo-content--images">';
            $.each(aIdCombo, function (i, v) {
                htmlImg +=
                    '<a href="' +
                    result[v].url +
                    '" title="' +
                    result[v].title +
                    '" class="image ">';
                htmlImg +=
                    '<img src="' +
                    Haravan.resizeImage(result[v].img, "medium") +
                    '" alt="' +
                    result[v].title +
                    '">';
                htmlImg += "</a>";
                if (i < numIdCombo) {
                    htmlImg += '<p class="plus">+</p>';
                }
            });
            htmlImg += "</div>";
            return htmlImg;
        }

        function render_price(result, dtCombo) {
            var dt_of_combo = {},
                price_combo = 0;

            if (!dtCombo.is_apply_by_variant) {
                dt_of_combo.quantity = dtCombo.quantity;
                switch (dtCombo.type) {
                    case 1:
                        price_combo = result.price - dtCombo.promotion_value;
                        break;
                    case 2:
                        price_combo =
                            result.price - result.price * (dtCombo.promotion_value / 100);
                        break;
                    default:
                        price_combo = dtCombo.promotion_value;
                }
                dt_of_combo.price = price_combo;
            } else {
                $.each(dtCombo.apply_productvariants, function (i, v) {
                    if (v != null) {
                        dt_of_combo.quantity = v.qty;
                        switch (v.type) {
                            case 1:
                                price_combo = result.variants[v.id].price - v.promotion_value;
                                break;
                            case 2:
                                price_combo =
                                    result.variants[v.id].price -
                                    result.variants[v.id].price * (v.promotion_value / 100);
                                break;
                            default:
                                price_combo = v.promotion_value;
                        }
                        dt_of_combo.price = price_combo;
                    }
                });
            }
            return dt_of_combo;
        }

        function render_detail(result, iCombo, nCombo) {
            var htmlDetail = '<div class="combo-content--detail">';
            htmlDetail += "<ul>";
            var totalPriceCombo = 0;
            $.each(nCombo, function (i, v) {
                /* Xử lý giá trị từ app */
                var dtCombo = render_price(result[v], dataItemsCombo[iCombo][v]);
                /* End Xử lý */
                var dtPrice = $.isEmptyObject(dtCombo)
                    ? result[v].price
                    : dtCombo.price;
                var dtQty = $.isEmptyObject(dtCombo) ? 1 : dtCombo.quantity;
                totalPriceCombo += dtPrice * dtQty;
                if (v == currentId) {
                    htmlDetail += '<li class="item-force">';
                    htmlDetail += '<label for="item-force">';
                    htmlDetail +=
                        '<input type="checkbox" id="item-force" class="force" name="combo-option" value="' +
                        result[v].first_available +
                        '"  data-combo="' +
                        dtPrice +
                        '" data-quantity="' +
                        dtQty +
                        '" data-origin="' +
                        result[v].price +
                        '"  checked/>';
                } else {
                    htmlDetail += "<li><label>";
                    htmlDetail +=
                        '<input type="checkbox" name="combo-option" value="' +
                        result[v].first_available +
                        '" data-combo="' +
                        dtPrice +
                        '" data-quantity="' +
                        dtQty +
                        '" data-origin="' +
                        result[v].price +
                        '"  checked/>';
                }
                htmlDetail += "</label>";
                htmlDetail +=
                    '<p class="combo-item--title">' +
                    (v == currentId ? "<strong>Bạn đang xem: </strong> " : "") +
                    dtQty +
                    " x " +
                    result[v].title;
                htmlDetail +=
                    "<span><b>" +
                    Haravan.formatMoney(result[v].price * 100, formatMoney) +
                    "</b>" +
                    (result[v].price < result[v].compare_at_price
                        ? "<del>" +
                        Haravan.formatMoney(
                            result[v].compare_at_price * 100,
                            formatMoney
                        ) +
                        "</del>"
                        : "") +
                    "</span>";
                htmlDetail += "</p>";
                htmlDetail +=
                    '<p class="combo-item--price">' +
                    Haravan.formatMoney(dtPrice * dtQty * 100, formatMoney) +
                    (result[v].price > dtPrice
                        ? "<del>" +
                        Haravan.formatMoney(result[v].price * dtQty * 100, formatMoney) +
                        "</del>"
                        : "") +
                    "</p>";
                htmlDetail += "</li>";
            });
            htmlDetail += "</ul>";
            htmlDetail += "</div>";
            htmlDetail += '<div class="combo-content--total">';
            htmlDetail +=
                '<p>Tổng tiền: <span class="combo-total-price">' +
                Haravan.formatMoney(totalPriceCombo * 100, formatMoney) +
                "</span></p>";
            htmlDetail +=
                '<button type="button" class="add-combo">Thêm ' +
                nCombo.length +
                " vào giỏ hàng</button>";
            htmlDetail += "</div>";
            return htmlDetail;
        }

        function uniques(arr) {
            var a = [];
            for (var i = 0, l = arr.length; i < l; i++)
                if (a.indexOf(arr[i]) === -1 && arr[i] !== "") a.push(arr[i]);
            return a;
        }

        function addCombo(indx, aItems, callback) {
            if (indx < aItems.length) {
                $.ajax({
                    url: "/cart/add.js",
                    type: "POST",
                    data: "id=" + aItems[indx].vid + "&quantity=" + aItems[indx].qty,
                    async: false,
                    success: function (data) {
                        indx++;
                        addCombo(indx, aItems, callback);
                    },
                    error: function () {
                    },
                });
            } else {
                if (typeof callback === "function") return callback();
            }
        }

        var parentDOM = "." + (view != undefined ? "q-" : "") + "combo-info";

        $.get(
            "https://combo-omni.haravan.com/js/list_recommendeds?product_id=" +
            currentId
        ).done(function (data) {
            if (data.length > 0) {
                $.each(data, function (i, v) {
                    var temp = [];
                    var temp2 = {};
                    $.each(v.recommendeds, function (j, k) {
                        temp.push(k.product_id);
                        aIdSearch.push(k.product_id);
                        temp2[k.product_id] = k;
                    });
                    aIdCombo.push(temp);
                    dataItemsCombo.push(temp2);
                });

                aIdSearch = uniques(aIdSearch);
                var str =
                    "/search?q=filter=((id:product=" +
                    aIdSearch.join(")||(id:product=") +
                    "))";
                $.get(str + "&view=datacombo").done(function (result) {
                    result = JSON.parse(result);
                    $.each(aIdCombo, function (i, v) {
                        var allAvailable = true;
                        /* Kiểm tra có item nào trong combo ko valid thì không hiển thị */
                        /* Hoặc có item nào bị ẩn thì ko hiển thị */
                        $.each(v, function (j, k) {
                            if (result[k]) {
                                if (dataItemsCombo[i][k].is_apply_by_variant) {
                                    var apply_length =
                                        dataItemsCombo[i][k].apply_productvariants.length;
                                    $.each(
                                        dataItemsCombo[i][k].apply_productvariants,
                                        function (l, m) {
                                            if (!result[k].variants[m.id].available) {
                                                allAvailable = false;
                                                if (apply_length == 1) return false;
                                                else m = null;
                                            }
                                        }
                                    );
                                } else {
                                    if (!result[k].available) {
                                        allAvailable = false;
                                        return false;
                                    }
                                }
                            } else {
                                allAvailable = false;
                                return false;
                            }
                        });
                        /* End Kiểm tra */

                        /* Nếu kiểm tra các item trong combo đều còn hàng thì render */
                        if (allAvailable) {
                            htmlCombo += '<div class="combo-info--content">';
                            var htmlImg = render_img(result, v);
                            var htmlDetail = render_detail(result, i, v);
                            htmlCombo += htmlImg;
                            htmlCombo += htmlDetail;
                            htmlCombo += "</div>";
                        }
                    });

                    if (htmlCombo != "") {
                        $(parentDOM).append(htmlCombo).removeClass("d-none");
                    }
                });
            }
        });

        $(parentDOM).delegate(
            'input[name="combo-option"]:not(.force)',
            "change",
            function () {
                var ind = $(this).parents("li").index();
                var total = 0;
                if (ind >= 0) {
                    if ($(this).is(":checked")) {
                        $(this)
                            .parents(".combo-info--content")
                            .find(".combo-content--images a:nth-child(" + (ind * 2 + 1) + ")")
                            .removeClass("disabled");
                    } else {
                        $(this)
                            .parents(".combo-info--content")
                            .find(".combo-content--images a:nth-child(" + (ind * 2 + 1) + ")")
                            .addClass("disabled");
                    }

                    var numCombo = $(this)
                        .parents(".combo-info--content")
                        .find("input").length;
                    var numCheck = $(this)
                        .parents(".combo-info--content")
                        .find("input:checked").length;
                    $(this)
                        .parents(".combo-info--content")
                        .find("input")
                        .each(function () {
                            var combo = parseInt($(this).attr("data-combo").trim());
                            var qty = parseInt($(this).attr("data-quantity").trim());
                            var origin = parseInt($(this).attr("data-origin").trim());
                            if (numCombo == numCheck) {
                                total += combo * qty;
                                var htmlDel = "";
                                if (origin > combo) {
                                    htmlDel +=
                                        "<del>" +
                                        Haravan.formatMoney(origin * qty * 100, formatMoney) +
                                        "</del>";
                                }
                                $(this)
                                    .parents("li")
                                    .find(".combo-item--price")
                                    .html(
                                        Haravan.formatMoney(combo * qty * 100, formatMoney) +
                                        htmlDel
                                    );
                            } else {
                                var origin = parseInt($(this).attr("data-origin").trim());
                                $(this)
                                    .parents("li")
                                    .find(".combo-item--price")
                                    .html(Haravan.formatMoney(origin * qty * 100, formatMoney));
                                if ($(this).is(":checked")) total += origin * qty;
                            }
                        });
                    $(this)
                        .parents(".combo-info--content")
                        .find(".combo-total-price")
                        .html(Haravan.formatMoney(total * 100, formatMoney));
                }
                var checkcount = $('input[name="combo-option"]:checked').length;
                $(this)
                    .parents(".combo-info--content")
                    .find(".add-combo")
                    .html(
                        "Thêm " + (checkcount == 1 ? "" : checkcount + " ") + "vào giỏ"
                    );
            }
        );

        $(parentDOM).delegate(".add-combo", "click", function () {
            var aItems = [];
            $(this)
                .parents(".combo-info--content")
                .find("input:checked")
                .each(function () {
                    var temp = {};
                    temp.vid = $(this).val();
                    //temp.qty = $(this).attr('data-quantity');
                    temp.qty =
                        parseInt($(this).attr("data-quantity")) *
                        parseInt($("#quantity").val());
                    aItems.push(temp);
                });
            addCombo(0, aItems, function () {
                //window.location = '/cart';
                HRT.All.getCartModal();
                if ($(window).width() < 992) {
                    $("body").removeClass("locked-scroll").addClass("body-showcart");
                    $(".siteCart-mobile").addClass("show-cart");
                }
            });
        });
    },
};

HRT.Quickview = {
    init: function () {
        var that = this;
        that.renderQuickview();
        that.shareLinkQuickview();
        HRT.Product.toggleDescProduct(".product-description--quickview");
        that.addCartProductQuickview();
        that.closeQuickView();
    },
    renderQuickview: function () {
        jQuery(document).on("click", ".quickview-product", function (e) {
            var id = $(this).closest(".product-loop").attr("data-id");

            if (jQuery(window).width() < 768) {
                if (promotionApp) {
                    if (
                        !$('.product-loop[data-id="' + id + '"]')
                            .find(".gift.product_gift_label")
                            .hasClass("hidden")
                    )
                        window.location.href = $(this)
                            .closest(".product-loop")
                            .find("a")
                            .attr("href");
                    else {
                        e.preventDefault();
                        var prolink = jQuery(this).attr("data-handle");
                        var protitle = jQuery(this)
                            .parents(".product-inner")
                            .find(".proloop-detail h3")
                            .text();
                        history.pushState(window.location.href, protitle, prolink);

                        $(".mainBody-theme").addClass("body-scroll");
                        $(".wrapper-quickview").addClass("show-quickview");
                        $(".modal-detailProduct").removeClass("fixed_pro").html("");
                        $(".modal-detailProduct--scroll")
                            .parent(".modal-detailProduct")
                            .find(".modal-detailProduct--scroll")
                            .css({height: "100%"});
                        jQuery.ajax({
                            url: prolink + "?view=quickview",
                            async: true,
                            success: function (data) {
                                $(".paramlink-topbar").find(".purl-title span").html(protitle);
                                setTimeout(function () {
                                    jQuery(".modal-detailProduct").html(data);
                                    HRT.Quickview.sliderProductQuickview();
                                    if (productReviewsApp) {
                                        ProductReviews.init();
                                    }
                                }, 200);
                            },
                        });
                        if ($(".wrapper-quickview").hasClass("show-quickview")) {
                            $(".mainHeader").removeClass("hSticky-up");
                        }
                    }
                } else {
                    e.preventDefault();
                    var prolink = jQuery(this).attr("data-handle");
                    var protitle = jQuery(this)
                        .parents(".product-inner")
                        .find(".proloop-detail h3")
                        .text();
                    history.pushState(window.location.href, protitle, prolink);

                    $(".mainBody-theme").addClass("body-scroll");
                    $(".wrapper-quickview").addClass("show-quickview");
                    $(".modal-detailProduct").removeClass("fixed_pro").html("");
                    $(".modal-detailProduct--scroll")
                        .parent(".modal-detailProduct")
                        .find(".modal-detailProduct--scroll")
                        .css({height: "100%"});
                    jQuery.ajax({
                        url: prolink + "?view=quickview",
                        async: true,
                        success: function (data) {
                            $(".paramlink-topbar").find(".purl-title span").html(protitle);
                            setTimeout(function () {
                                jQuery(".modal-detailProduct").html(data);
                                HRT.Quickview.sliderProductQuickview();
                                if (productReviewsApp) {
                                    ProductReviews.init();
                                }
                            }, 200);
                        },
                    });
                    if ($(".wrapper-quickview").hasClass("show-quickview")) {
                        $(".mainHeader").removeClass("hSticky-up");
                    }
                }
            } else {
                window.location.href = $(this)
                    .closest(".product-loop")
                    .find("a")
                    .attr("href");
            }
        });
    },

    closeQuickView: function () {
        var proT = document.title; /*   */
        var proL = window.location.href;
        jQuery(window).on("popstate", function () {
            location.reload(true);
        });
        jQuery(document).on("click", ".quickview-close", function (e) {
            history.pushState(window.location.href, proT, proL);
            // history.back();
            jQuery(".wrapper-quickview").removeClass("show-quickview");
            jQuery(".mainBody-theme").removeClass("body-scroll");
        });
    },
    shareLinkQuickview: function () {
        $(document).on("click", ".quickview-sharingProduct", function () {
            $(this).toggleClass("sharing-active");
        });
        $(document).on(
            "click",
            ".quickview-sharingProduct .sharing__link",
            function () {
                var copyText = document.getElementById("myInputQuickview");
                copyText.select();
                copyText.setSelectionRange(0, 99999);
                document.execCommand("copy");
                $(this).find(".toollip-txt").html("Đã sao chép");
            }
        );
    },
    sliderProductQuickview: function () {
        jQuery("#quickview-sliderproduct").owlCarousel({
            items: 1,
            nav: true,
            dots: true,
            lazyLoad: true,
            loop: false,
            smartSpeed: 1000,
            //touchDrag: false,
        });
    },
    addCartProductQuickview: function () {
        $(document).on("click", "#add-to-cartQuickview", function (e) {
            e.preventDefault();
            jQuery(this).addClass("clicked_buy");
            HRT.All.addItemShowModalCart($("#product-select-quickview").val());
            $(".quickview-close").trigger("click");
        });
    },
    plusQtyView: function () {
        if (jQuery('.quickview-qtyvalue[name="quantity"]').val() != undefined) {
            var currentVal = parseInt(
                jQuery('.quickview-qtyvalue[name="quantity"]').val()
            );
            if (!isNaN(currentVal)) {
                jQuery('.quickview-qtyvalue[name="quantity"]').val(currentVal + 1);
            } else {
                jQuery('.quickview-qtyvalue[name="quantity"]').val(1);
            }
        } else {
            console.log(
                "error: Not see elemnt " + jQuery('input[name="quantity"]').val()
            );
        }
    },
    minusQtyView: function () {
        if (jQuery('.quickview-qtyvalue[name="quantity"]').val() != undefined) {
            var currentVal = parseInt(
                jQuery('.quickview-qtyvalue[name="quantity"]').val()
            );
            if (!isNaN(currentVal) && currentVal > 1) {
                jQuery('.quickview-qtyvalue[name="quantity"]').val(currentVal - 1);
            }
        } else {
            console.log(
                "error: Not see elemnt " + jQuery('input[name="quantity"]').val()
            );
        }
    },
};

HRT.Cart = {
    init: function () {
        var that = this;
        if ($(".summary-picktime").length > 0) {
            that.initTimeCart();
            that.pickOptionTime();
            that.checkTimeExist();
        }
        that.clickCheckoutCart();
        that.addCartSocial();
        that.clickCheckbill();
        that.checkChangeInput();
        that.clickSaveInfoBill();
    },
    removeItemCart: function (t, url) {
        var self = $(t);
        swal({
            text: "Bạn chắc chắn muốn bỏ sản phẩm này ra khỏi giỏ hàng?",
            buttons: ["Hủy", "Đồng ý"],
            className: "swal-cart-remove",
        }).then(function () {
            $("body").on("click", ".swal-button--confirm", function () {
                jQuery.ajax({
                    type: "GET",
                    url: url,
                    dataType: "json",
                    success: function (data) {
                        var elItem = self.closest(".line-item");
                        elItem.css("background-color", "#fcfcfc").fadeOut();
                        setTimeout(function () {
                            var elParentItem = elItem.parent();
                            elItem.remove();
                            var itemLength = elParentItem.find(".line-item").length;
                            if (itemLength == 0) {
                                elParentItem.remove();
                            }
                        }, 200);
                        window.location.reload();
                        /*	if (data.item_count == 0) {
							window.location.href = '/';
							return;
						}	else{}*/
                    },
                    error: function (erorr) {
                        console.log(error);
                    },
                });
            });
        });
    },
    updatePriceChange: function () {
        var params = {
            type: "POST",
            url: "/cart/update.js",
            data: $("#cartformpage").serialize(),
            async: false,
            dataType: "json",
            success: function (data) {
                $.each(data.items, function (i, v) {
                    $(".table-cart .line-item:eq(" + i + ") .line-item-total").html(
                        Haravan.formatMoney(v.line_price, formatMoney)
                    );
                });
                if (priceMin != "") {
                    if (priceMin <= data.total_price / 100) {
                        $(".summary-alert").removeClass("inn").slideUp("200");
                        $(".checkout-btn").removeClass("disabled");
                        $(".linktocheckout").attr("href", "/checkout");
                    } else {
                        $(".summary-alert").addClass("inn").slideDown("200");
                        $(".checkout-btn").addClass("disabled");
                        $(".linktocheckout").attr("href", "/cart");
                    }
                }
                $(".summary-total span").html(
                    Haravan.formatMoney(data.total_price, formatMoney)
                );
                $(".cart-total-price").html(
                    Haravan.formatMoney(data.total_price, formatMoney)
                );
                $(".total_price").html(
                    Haravan.formatMoney(data.total_price, formatMoney)
                );
                $(".count-cart").html(data.item_count);
                $(".count-holder .count").html(data.item_count);
            },
            error: function (XMLHttpRequest, textStatus) {
                Haravan.onError(XMLHttpRequest, textStatus);
            },
        };
        jQuery.ajax(params);
    },
    initQuantityCart: function () {
        $(document).on("click", ".qty-click .qtyplus", function (e) {
            e.preventDefault();
            var input = $(this).parent(".quantity-partent").find("input");
            var currentVal = parseInt(input.val());
            if (!isNaN(currentVal)) {
                input.val(currentVal + 1);
            } else {
                input.val(1);
            }
            HRT.Cart.updatePriceChange();
        });
        $(document).on("click", ".qty-click .qtyminus", function (e) {
            e.preventDefault();
            var input = $(this).parent(".quantity-partent").find("input");
            var currentVal = parseInt(input.val());
            if (!isNaN(currentVal) && currentVal > 1) {
                input.val(currentVal - 1);
            } else {
                input.val(1);
            }
            HRT.Cart.updatePriceChange();
        });
        $(document).on(
            "change",
            ".qty-click .item-quantity",
            delayTime(function () {
                HRT.Cart.updatePriceChange();
            }, 400)
        );
    },

    checkTimeExist: function () {
        $.when($.get("/cart.js")).then(function (result) {
            if (result != null && result.attributes.hasOwnProperty("Delivery Time")) {
                var now = new Date().getTime();
                var txtNow = $("#picktime_radio label[for='timeRadios-1']").text();
                if (result.attributes["Delivery Time"] == txtNow) {
                    var maxExist =
                        dateNowJs + " " + $("#picktime_radio").attr("data-time-start");
                    maxExist = new Date(maxExist).getTime();
                } else {
                    var dataTime = result.attributes["Delivery Time"].split(" ");
                    var maxExist =
                        dataTime[0].split("/").reverse().join("/") +
                        " " +
                        dataTime[dataTime.length - 1] +
                        ":00";
                    maxExist = new Date(maxExist).getTime();
                }
                if (now > maxExist || maxExist - now < 45 * 60 * 1000) {
                    $(".txt-time span").html("Chọn thời gian");
                    //delete result.attributes['Delivery Time'];
                    result.attributes["Delivery Time"] = null;
                    $.post("/cart/update.js", {attributes: result.attributes}).done(
                        function (cart) {
                            cartGet = cart;
                        }
                    );
                }
            }
        });
    },
    checkTimeAvailable: function (time) {
        var countDisable = 0;
        var rangeTime = $("#time_shipping option").length;
        /* Check trong ngày từ 8h đến 21h */
        var stillAvailable = true;
        /* Nếu nhập giờ bắt đầu ko nhận đơn và giờ bắt đầu mở cửa */
        var startStop = (endStop = null);

        if (
            $("#picktime_radio").attr("data-time-end") != "" &&
            $("#picktime_radio").attr("data-time-start") != ""
        ) {
            //debugger;
            var dataStart = Number(
                $("#picktime_radio").attr("data-time-start").replace(/\:/g, "")
            );
            var dataEnd = Number(
                $("#picktime_radio").attr("data-time-end").replace(/\:/g, "")
            );
            startStop = new Date(
                dateNowJs + " " + $("#picktime_radio").attr("data-time-start")
            ).getTime();
            endStop =
                new Date(
                    dateNowJs + " " + $("#picktime_radio").attr("data-time-end")
                ).getTime() + (dataStart > dataEnd ? 84600000 : 0);
            if (dataStart < dataEnd) {
                if (time > startStop && time <= endStop) stillAvailable = false;
            } else {
                if (startStop < endStop && time <= endStop) stillAvailable = false;
            }
        }

        var timeOpenWork = 0;
        var newChange = false;
        $("#time_shipping option").each(function (j, t) {
            var min_time = new Date(dateNowJs + " " + $(this).attr("data-min"));
            var max_time = new Date(dateNowJs + " " + $(this).attr("data-max"));
            min_time = min_time.getTime();
            max_time = max_time.getTime();
            if (j == 0) timeOpenWork = min_time;

            var checkLimitTime = false;
            //debugger;
            if (startStop != null && endStop != null) {
                if (dataStart < dataEnd) {
                    if (max_time <= endStop) checkLimitTime = true;
                } else {
                    //if((min_time >= startStop && time <= endStop) || time < timeOpenWork) checkLimitTime = true;
                    if ((min_time >= startStop && time <= endStop) || time < timeOpenWork)
                        checkLimitTime = true;
                }
            }

            if (
                time > max_time ||
                (max_time > time &&
                    time > min_time &&
                    max_time - time < 45 * 60 * 1000) ||
                checkLimitTime
            ) {
                $(this).attr("disabled", true);
                countDisable++;
            } else {
                if (newChange == false) {
                    $("#time_shipping").val($(this).attr("value")).change();
                    newChange = true;
                }
            }
        });

        if (countDisable == rangeTime)
            $("#btn-cart-accepttime").attr("disabled", true).addClass("disabled");
        if (stillAvailable == false)
            $("#btnCart-checkout")
                .addClass("btntime-disable")
                .html("Đã ngưng nhận đơn hôm nay");
    },
    initTimeCart: function () {
        var now = new Date();
        var nowObj = {
            date: now.getDate(),
            month: now.getMonth() + 1,
            year: now.getFullYear(),
        };
        dateNow =
            (nowObj.month < 10 ? "0" + nowObj.month : nowObj.month) +
            "/" +
            (nowObj.date < 10 ? "0" + nowObj.date : nowObj.date) +
            "/" +
            nowObj.year;
        dateNowVN =
            (nowObj.date < 10 ? "0" + nowObj.date : nowObj.date) +
            "/" +
            (nowObj.month < 10 ? "0" + nowObj.month : nowObj.month) +
            "/" +
            nowObj.year;
        dateNowJs =
            nowObj.year +
            "/" +
            (nowObj.month < 10 ? "0" + nowObj.month : nowObj.month) +
            "/" +
            (nowObj.date < 10 ? "0" + nowObj.date : nowObj.date);
        var time = now.getTime();
        var date1 = new Date(time + 86400000);
        var date2 = new Date(time + 2 * 86400000);
        date1 = {
            date: date1.getDate(),
            month: date1.getMonth() + 1,
            year: date1.getFullYear(),
        };
        date2 = {
            date: date2.getDate(),
            month: date2.getMonth() + 1,
            year: date2.getFullYear(),
        };
        var date1Text =
            (date1.date < 10 ? "0" + date1.date : date1.date) +
            "/" +
            (date1.month < 10 ? "0" + date1.month : date1.month) +
            "/" +
            date1.year;
        var date2Text =
            (date2.date < 10 ? "0" + date2.date : date2.date) +
            "/" +
            (date2.month < 10 ? "0" + date2.month : date2.month) +
            "/" +
            date2.year;
        var htmlDate =
            '<option value="' + date1Text + '">' + date1Text + "</option>";
        htmlDate += '<option value="' + date2Text + '">' + date2Text + "</option>";
        $("#date_shipping").append(htmlDate);
        this.checkTimeAvailable(time);
    },
    pickOptionTime: function () {
        var that = this;
        $("#picktime_radio input[name='timeRadios']").on("change", function () {
            if ($("#picktime_radio input[name='timeRadios']:checked").length == 0) {
                //$(".side-cart--time").addClass('js-opacity-time');
            } else {
                //$(".side-cart--time").removeClass('js-opacity-time');
                if (
                    $("#picktime_radio input[name='timeRadios']:checked").val() ==
                    "timeNow"
                ) {
                    $(".picktime_selecter").slideUp(300);
                    $(".boxtime-title .txt-time span").html(
                        $("#picktime_radio label[for='timeRadios-1']").text()
                    );

                    var startStop = (endStop = null);
                    var stillAvailable = true;

                    var now = new Date().getTime();
                    if (
                        $("#picktime_radio").attr("data-time-end") != "" &&
                        $("#picktime_radio").attr("data-time-start") != ""
                    ) {
                        var dataStart = Number(
                            $("#picktime_radio").attr("data-time-start").replace(/\:/g, "")
                        );
                        var dataEnd = Number(
                            $("#picktime_radio").attr("data-time-end").replace(/\:/g, "")
                        );
                        endStop =
                            new Date(
                                dateNowJs + " " + $("#picktime_radio").attr("data-time-end")
                            ).getTime() + (dataStart > dataEnd ? 84600000 : 0);
                        startStop = new Date(
                            dateNowJs + " " + $("#picktime_radio").attr("data-time-start")
                        ).getTime();
                        if (dataStart < dataEnd) {
                            if (now > startStop && now <= endStop) stillAvailable = false;
                        } else {
                            if (startStop < endStop && now <= endStop) stillAvailable = false;
                        }
                        //if(now > startStop && now <= endStop) stillAvailable = false;
                    }

                    if (startStop != null && endStop != null) {
                        if (stillAvailable == false) {
                            $("#btnCart-checkout")
                                .addClass("btntime-disable")
                                .html("Đã ngưng nhận đơn hôm nay");
                        } else {
                            cartGet.attributes["Delivery Time"] = $(
                                "#picktime_radio label[for='timeRadios-1']"
                            ).text();
                            $.post("/cart/update.js", {
                                attributes: cartGet.attributes,
                            }).done(function (cart) {
                                cartGet = cart;
                                cartAttributes = cart.attributes;
                                if (cart.total_price > 0)
                                    $("#btnCart-checkout")
                                        .removeClass("btntime-disable")
                                        .html("Thanh toán");
                            });
                        }
                    } else {
                        cartGet.attributes["Delivery Time"] = $(
                            "#picktime_radio label[for='timeRadios-1']"
                        ).text();
                        $.post("/cart/update.js", {attributes: cartGet.attributes}).done(
                            function (cart) {
                                cartGet = cart;
                                cartAttributes = cart.attributes;
                                if (cart.total_price > 0)
                                    $("#btnCart-checkout")
                                        .removeClass("btntime-disable")
                                        .html("Thanh toán");
                            }
                        );
                    }
                } else if (
                    $("#picktime_radio input[name='timeRadios']:checked").val() ==
                    "timeDate"
                ) {
                    $(".picktime_selecter").slideDown(300);
                }
            }
        });

        $("#date_shipping").on("change", function () {
            var dateOrder = $(this).val();
            if (dateNowVN == dateOrder) {
                var now = new Date();
                var time = now.getTime();
                that.checkTimeAvailable(time);
            } else {
                $("#time_shipping option").removeAttr("disabled");
                $("#btn-cart-accepttime")
                    .removeAttr("disabled")
                    .removeClass("disabled");
                $("#btnCart-checkout")
                    .removeClass("btntime-disable")
                    .html("Thanh toán");
            }
        });

        $("#btn-cart-accepttime").on("click", function (e) {
            e.preventDefault();
            var time = $("#picktime_radio label[for='timeRadios-1']").text();
            if (
                $("#picktime_radio input[name='timeRadios']:checked").val() ==
                "timeDate"
            ) {
                time = $("#date_shipping").val() + " " + $("#time_shipping").val();
                cartGet.attributes["Delivery Time"] = time;
            }
            $(".boxtime-title .txt-time span").html(time);
            $(".picktime_selecter").slideUp(300);
            $("#picktime_radio input[value='timeDate']").prop("checked", false);
            $.post("/cart/update.js", {attributes: cartGet.attributes}).done(
                function (cart) {
                    cartGet = cart;
                    //debugger;
                    $("#btnCart-checkout")
                        .removeClass("btntime-disable")
                        .html("Thanh toán");
                }
            );
        });
    },

    clickCheckoutCart: function () {
        $(document).on("click", "#btnCart-checkout:not(.disabled)", function (e) {
            e.preventDefault();
            var updateNote = $("#note").val();
            var total_price = Number(
                $(".summary-total span").html().replace(/\,/g, "").replace("₫", "")
            );
            var a = $(this);
            if (Number(priceMin) <= total_price) {
                $(".summary-alert").removeClass("inn").slideUp("200");
                if ($("#checkbox-bill").is(":checked")) {
                    var a = $(this);
                    swal({
                        title: "Bạn có muốn xuất hóa đơn?",
                        text: "Hãy kiểm tra lại thông tin hóa đơn của mình thật chính xác!",
                        icon: "warning",
                        buttons: ["Không", "Có"],
                    }).then(function () {
                        $("body").on("click", ".swal-button--confirm", function () {
                            var f = true;
                            $("#cartformpage .val-f").each(function () {
                                if ($(this).val() === "") {
                                    f = false;
                                    if ($(this).siblings("span.text-danger").length == 0)
                                        $(this).after(
                                            '<span class="text-danger">Bạn không được để trống trường này</span>'
                                        );
                                } else {
                                    $(this).siblings("span.text-danger").remove();
                                }
                                if (
                                    $(this).hasClass("val-n") &&
                                    $(this).val().trim().length < 10
                                ) {
                                    f = false;
                                    if ($(this).siblings("span.text-danger").length == 0)
                                        $(this).after(
                                            '<span class="text-danger">Mã số thuế phải tối thiểu 10 ký tự</span>'
                                        );
                                }
                                if (
                                    $(this).hasClass("val-mail") &&
                                    HRT.All.checkemail($(this).val()) == false
                                ) {
                                    if ($(this).siblings("span.text-danger").length == 0)
                                        $(this).after(
                                            '<span class="text-danger">Email không hợp lệ</span>'
                                        );
                                }
                            });

                            if (f) {
                                var company = $(
                                    'input[name="attributes[bill_order_company]"]'
                                ).val();
                                var address = $(
                                    'input[name="attributes[bill_order_address]"]'
                                ).val();
                                var tax = $(
                                    'input[name="attributes[bill_order_tax_code]"]'
                                ).val();
                                var mail = $('input[name="attributes[bill_email]"]').val();
                                //var cart_info = {'company':company, 'address': address, 'tax':tax};
                                //Cookies.set('cart_info', cart_info);
                                //a.unbind(e).click();
                                cartAttributes.invoice = "yes";
                                if (
                                    company == "" &&
                                    cartAttributes.hasOwnProperty("bill_order_company")
                                ) {
                                    cartAttributes.bill_order_company = null;
                                } else {
                                    cartAttributes.bill_order_company = company;
                                }

                                if (
                                    address == "" &&
                                    cartAttributes.hasOwnProperty("bill_order_address")
                                ) {
                                    cartAttributes.bill_order_address = null;
                                } else {
                                    cartAttributes.bill_order_address = address;
                                }

                                if (
                                    tax == "" &&
                                    cartAttributes.hasOwnProperty("bill_order_tax_code")
                                ) {
                                    cartAttributes.bill_order_tax_code = null;
                                } else {
                                    cartAttributes.bill_order_tax_code = tax;
                                }

                                if (mail == "" && cartAttributes.hasOwnProperty("bill_email")) {
                                    cartAttributes.bill_email = null;
                                } else {
                                    cartAttributes.bill_email = mail;
                                }

                                $.ajax({
                                    url: "/cart/update.js",
                                    type: "POST",
                                    data: {
                                        attributes: cartAttributes,
                                        note: updateNote,
                                    },
                                    success: function (data) {
                                        window.location = "/checkout";
                                    },
                                });
                            }
                            if (!f) return false;
                        });
                        $("body").on("click", ".swal-button--cancel", function () {
                            window.location = "/checkout";
                        });
                    });
                } else {
                    if (cartAttributes.hasOwnProperty("invoice"))
                        cartAttributes.invoice = "no";
                    if (cartAttributes.hasOwnProperty("bill_order_company"))
                        cartAttributes.bill_order_company = null;
                    if (cartAttributes.hasOwnProperty("bill_order_address"))
                        cartAttributes.bill_order_address = null;
                    if (cartAttributes.hasOwnProperty("bill_order_tax_code"))
                        cartAttributes.bill_order_tax_code = null;
                    if (cartAttributes.hasOwnProperty("bill_email"))
                        cartAttributes.bill_email = null;
                    $.ajax({
                        url: "/cart/update.js",
                        type: "POST",
                        data: {
                            attributes: cartAttributes,
                            note: updateNote,
                        },
                        success: function (data) {
                            window.location = "/checkout";
                        },
                    });
                }
            } else {
                $(".summary-alert").addClass("inn").slideDown("200");
            }
        });
    },
    clickCheckbill: function () {
        if ($(".order-invoice-block .regular-checkbox").is(":checked")) {
            $(".bill-field").show();
        }
        $("#cartformpage .regular-checkbox").click(function () {
            if ($(this).is(":checked")) {
                $(this).siblings("#re-checkbox-bill").val("yes");
            } else {
                $(this).siblings("#re-checkbox-bill").val("no");
                $("#cartformpage .val-f").siblings("span.text-danger").remove();
            }
            $("#cartformpage .bill-field").slideToggle(300);
        });
    },
    checkChangeInput: function () {
        $(".check_change").on("change paste keyup", function () {
            jQuery(".btn-save").html("Lưu thông tin");
        });
    },
    clickSaveInfoBill: function () {
        $(".order-invoice-block .btn-save").on("click", function (e) {
            e.preventDefault();
            $("#cartformpage .val-f").each(function () {
                if ($(this).val() === "") {
                    if ($(this).siblings("span.text-danger").length == 0)
                        $(this).after(
                            '<span class="text-danger">Bạn không được để trống trường này</span>'
                        );
                } else {
                    $(this).siblings("span.text-danger").remove();
                    setTimeout(function () {
                        jQuery(".btn-save").html("Đã lưu thông tin");
                    }, 500);
                }
                if ($(this).hasClass("val-n") && $(this).val().trim().length < 10) {
                    if ($(this).siblings("span.text-danger").length == 0)
                        $(this).after(
                            '<span class="text-danger">Mã số thuế phải tối thiểu 10 ký tự</span>'
                        );
                }

                if (
                    $(this).hasClass("val-mail") &&
                    HRT.All.checkemail($(this).val()) == false
                ) {
                    if ($(this).siblings("span.text-danger").length == 0)
                        $(this).after(
                            '<span class="text-danger">Email không hợp lệ</span>'
                        );
                }
            });
        });
    },
    addCartSocial: function () {
        var href = window.location.href;
        if (href.indexOf("?add=") != -1) {
            var splitHref = href.split("?add=")[1];
            var variantId = parseInt($.trim(splitHref.split("&ref=")[0]));
            $.ajax({
                url: "/cart/" + variantId + ":1",
                success: function (data) {
                    var x = false;
                    if (data.items.length > 0) {
                        data.items.map(function (v, i) {
                            if (v.variant_id == variantId) {
                                x = true;
                            }
                        });
                    }
                    if (!x) {
                        alert("Sản phẩm bạn vừa mua đã hết hàng");
                    }
                    window.location = "/cart";
                },
                error: function (XMLHttpRequest, textStatus) {
                    Haravan.onError(XMLHttpRequest, textStatus);
                },
            });
        }
    },
};

HRT.Article = {
    init: function () {
        var that = this;
        that.tbOfContentsArt();
    },

    tbOfContentsArt: function () {
        if ($(".article-table-contents").length > 0) {
            function urlfriendly(slug) {
                //Đổi chữ hoa thành chữ thường
                //Đổi ký tự có dấu thành không dấu
                slug = slug.toLowerCase();
                slug = slug.trim().replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
                slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
                slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
                slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
                slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
                slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
                slug = slug.replace(/đ/gi, "d");
                //Xóa các ký tự đặt biệt
                slug = slug.replace(
                    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
                    "_"
                );
                //Đổi khoảng trắng thành ký tự gạch ngang
                slug = slug.replace(/ /gi, "_");
                //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
                //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
                slug = slug.replace(/\-\-\-\-\-/gi, "_");
                slug = slug.replace(/\-\-\-\-/gi, "_");
                slug = slug.replace(/\-\-\-/gi, "_");
                slug = slug.replace(/\-\-/gi, "_");
                //Xóa các ký tự gạch ngang ở đầu và cuối
                slug = "@" + slug + "@";
                slug = slug.replace(/\@\-|\-\@|\@/gi, "");
                //In slug ra textbox có id “slug”
                return slug;
            }

            class TableOfContents {
                constructor({from, to}) {
                    this.fromElement = from;
                    this.toElement = to;
                    // Get all the ordered headings.
                    this.headingElements = this.fromElement.querySelectorAll(
                        "h1, h2, h3,h4,h5,h6"
                    );
                    this.tocElement = document.createElement("div");
                }

                /*  Get the most important heading level.
        For example if the article has only <h2>, <h3> and <h4> tags
        this method will return 2.
     */
                getMostImportantHeadingLevel() {
                    let mostImportantHeadingLevel = 6; // <h6> heading level
                    for (let i = 0; i < this.headingElements.length; i++) {
                        let headingLevel = TableOfContents.getHeadingLevel(
                            this.headingElements[i]
                        );
                        mostImportantHeadingLevel =
                            headingLevel < mostImportantHeadingLevel
                                ? headingLevel
                                : mostImportantHeadingLevel;
                    }
                    return mostImportantHeadingLevel;
                }

                static generateId(headingElement) {
                    return urlfriendly(headingElement.textContent);
                }

                static getHeadingLevel(headingElement) {
                    switch (headingElement.tagName.toLowerCase()) {
                        case "h2":
                            return 2;
                        case "h3":
                            return 3;
                            break;
                        default:
                            return 4;
                    }
                }

                generateTable() {
                    let currentLevel = this.getMostImportantHeadingLevel() - 1,
                        currentElement = this.tocElement;
                    for (let i = 0; i < this.headingElements.length; i++) {
                        let headingElement = this.headingElements[i],
                            headingLevel = TableOfContents.getHeadingLevel(headingElement),
                            headingLevelDifference = headingLevel - currentLevel,
                            linkElement = document.createElement("a");
                        if (!headingElement.id) {
                            headingElement.id = TableOfContents.generateId(headingElement);
                        }
                        linkElement.href = `#${headingElement.id}`;
                        linkElement.textContent = headingElement.textContent;

                        if (headingLevelDifference > 0) {
                            // Go down the DOM by adding list elements.
                            for (let j = 0; j < headingLevelDifference; j++) {
                                let listElement = document.createElement("ul"),
                                    listItemElement = document.createElement("li");
                                listElement.appendChild(listItemElement);
                                currentElement.appendChild(listElement);
                                currentElement = listItemElement;
                            }
                            currentElement.appendChild(linkElement);
                        } else {
                            // Go up the DOM.
                            for (let j = 0; j < -headingLevelDifference; j++) {
                                currentElement = currentElement.parentNode.parentNode;
                            }
                            let listItemElement = document.createElement("li");
                            listItemElement.appendChild(linkElement);
                            currentElement.parentNode.appendChild(listItemElement);
                            currentElement = listItemElement;
                        }
                        currentLevel = headingLevel;
                    }
                    if (this.tocElement.firstChild != null) {
                        this.toElement.appendChild(this.tocElement.firstChild);
                    } else {
                        document.getElementById("table-content-container").remove();
                    }
                }
            }

            (function ($) {
                var stringtemplate = $(
                    '<div id="table-content-container" class="table-of-contents"><div class="table-title"><div class="htitle">Các nội dung chính<span class="toc_toggle">[<a class="icon-list" href="javascript:void(0)">Ẩn</a>]</span></div></div></div>'
                );
                stringtemplate.insertBefore(".article-table-contents");

                new TableOfContents({
                    from: document.querySelector(".article-table-contents"),
                    to: document.querySelector("#table-content-container"),
                }).generateTable();
                $("#table-content-container .icon-list").click(function () {
                    $(this)
                        .parents("#table-content-container")
                        .find("ul:first")
                        .slideToggle({direction: "left"}, 100);
                    var texxx = $(this).text();
                    if (texxx == "Ẩn") {
                        $(this).html("Hiện");
                    } else {
                        $(this).html("Ẩn");
                    }
                });

                var buttontable =
                    '<div class="table-content-button"><button class="btn-icolist"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.994 511.994"><path d="M35.537 292.17l-.225-.863 14.613-15.857c9.495-10.333 16.006-18.227 19.544-23.47s5.3-11.326 5.3-18.148c0-10.135-3.326-18.146-9.974-23.984-6.65-5.83-15.9-8.76-27.775-8.76-11.174 0-20.15 3.467-26.923 10.412S.06 226.807.3 236.795l.15.34 24.473.002c0-4.403 1.076-8.9 3.227-12.097s5.105-4.73 8.863-4.73c4.202 0 7.355 1.26 9.457 3.73s3.152 5.8 3.152 9.955c0 2.917-1.04 6.36-3.115 10.313s-5.72 8.458-10.122 13.5L1.28 294.304v15.478h74.847v-17.6h-40.6zM51.9 127.068V37.72L1.28 45.283v17.945h24.215v63.84H1.28v19.812h74.846v-19.812zm21.156 299.964c-3.265-4.33-7.8-7.542-13.574-9.668 5.092-2.325 9.16-5.55 12.2-9.677s4.56-8.643 4.56-13.534c0-9.84-3.5-17.442-10.53-22.806s-16.4-8.046-28.1-8.046c-10.087 0-18.665 2.67-25.736 8S1.418 384.007 1.716 392.6l.15.83h24.327c0-4.403 1.233-5.774 3.707-7.654s5.34-3 8.603-3c4.154 0 7.317 1.065 9.495 3.4s3.262 5.142 3.262 8.555c0 4.3-1.2 7.868-3.632 10.3s-5.884 3.837-10.384 3.837h-11.75v17.6h11.75c4.995 0 8.863 1.475 11.608 3.872s4.117 6.358 4.117 11.597c0 3.76-1.312 6.943-3.93 9.415s-6.133 3.74-10.534 3.74c-3.857 0-7.13-1.662-9.827-4s-4.042-4.803-4.042-9.206H.16l-.147.95c-.247 10.087 3.423 18.042 11.013 23.357s16.453 8.1 26.588 8.1c11.77 0 21.435-2.765 29-8.427S77.96 452.44 77.96 442.55c0-6.033-1.63-11.195-4.894-15.523zm75.7-64.426h363.227v72.645H148.767zm0-143.09h363.227v72.645H148.767zm0-147.483h363.227v72.645H148.767z"></path></svg></button> </div><div class="table-content-fixed"><div class="table-of-header"><span class="hTitle"> Các nội dung chính</span><span class="hClose"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.001 512.001"><path d="M284.286 256.002L506.143 34.144c7.81-7.81 7.81-20.475 0-28.285s-20.475-7.81-28.285 0L256 227.717 34.143 5.86c-7.81-7.81-20.475-7.81-28.285 0s-7.81 20.475 0 28.285L227.715 256 5.858 477.86c-7.81 7.81-7.81 20.475 0 28.285C9.763 510.05 14.882 512 20 512a19.94 19.94 0 0 0 14.143-5.857L256 284.287l221.857 221.857C481.762 510.05 486.88 512 492 512a19.94 19.94 0 0 0 14.143-5.857c7.81-7.81 7.81-20.475 0-28.285L284.286 256.002z"></path></svg></span></div><div id="clone-table" class="table-of-contents"></div></div>';
                $("#article-tbofcontent-scroll")
                    .append(buttontable)
                    .ready(function () {
                        var tablehtml = $("#table-content-container").html();
                        $("#clone-table").html(tablehtml);
                    });
            })(jQuery);

            $("body").on(
                "click",
                "#table-content-container ul li a, #clone-table  ul li a",
                function (e) {
                    e.preventDefault();
                    var id = $(this).attr("href");
                    $("html,body").animate({scrollTop: $(id).offset().top - 80}, 600);
                    $(".table-content-fixed").removeClass("active");
                }
            );
            $(".table-content-button .btn-icolist").on("click", function (e) {
                $(".table-content-fixed").toggleClass("active");
            });
            $(".table-content-fixed .table-of-header .hClose").on(
                "click",
                function (e) {
                    $(".table-content-fixed").toggleClass("active");
                }
            );
            if ($("#table-content-container").length > 0) {
                var ofsettop_ = $(".article-table-contents").offset().top + 50;
                $(window).scroll(function () {
                    if ($(window).scrollTop() > ofsettop_) {
                        $(".table-content-button").addClass("active");
                    } else {
                        $(".table-content-button").removeClass("active");
                        $(".table-content-fixed").removeClass("active");
                    }
                });
            }
        }
    },
};

HRT.Blog = {
    init: function () {
        var that = this;
    },
};

var limitPaginate = $(".section-market-collection").data("paginate"),
    lengthTab = $("#listMenu-mini .menu-item").length;
HRT.CollectionMini = {
    currentPag: Array(lengthTab).fill(1),
    totalPag: Array(lengthTab).fill(null),
    totalProd: Array(lengthTab).fill(0),
    init: function () {
        var that = this;
        that.scrollFixedCate();
        that.searchResultsMini();
        that.clickCategoryMini();
        that.fixHeightMini();
    },
    scrollFixedCate: function () {
        var $parentHeader = $(".header-market");
        var parentHeight = $parentHeader.outerHeight();
        $parentHeader.css("min-height", parentHeight);
        var resizeTimer = false,
            resizeWindow = $(window).prop("innerWidth");
        $(window).on("resize", function () {
            if (resizeTimer) {
                clearTimeout(resizeTimer);
            }
            resizeTimer = setTimeout(function () {
                var newWidth = $(window).prop("innerWidth");
                if (resizeWindow != newWidth) {
                    $(".header-market").removeClass("fixed-menu");
                    $parentHeader.css("min-height", "");
                    parentHeight = $parentHeader.outerHeight();
                    $parentHeader.css("min-height", parentHeight);
                    resizeWindow = newWidth;
                }
            }, 200);
        });
        setTimeout(function () {
            $(window).on("scroll", function () {
                var t =
                    $(".header-market").length == 1
                        ? $(".header-market").outerHeight() + 100
                        : 0;
                $(document).scrollTop() > t
                    ? ($(".header-market").addClass("fixed"),
                        $(".header-market").addClass("fixed-menu"))
                    : ($(".header-market").removeClass("fixed"),
                        $(".header-market").removeClass("fixed-menu"));
            });
        }, 300);
    },
    searchResultsMini: function () {
        var limit = limitPaginate;
        var total_search_page = 0; //Tổng trang
        var total_search_prod = 0,
            current_search_page = 1;
        var $resultsData = $(".section-market-results .results-products");
        $('.searchform-market input[type="text"]').bind(
            "keyup paste propertychange",
            delayTime(function () {
                var key = $(this).val(),
                    $parentForm = $(this).parents(".searchform-market");
                if (key.indexOf("script") > -1 || key.indexOf(">") > -1) {
                    alert(
                        "Từ khóa của bạn có chứa mã độc hại! Vui lòng nhập lại từ khóa khác"
                    );
                    $(this).val("");
                    $('.searchform-market input[type="text"]').val("");
                } else {
                    $(".ajloading").show();
                    if (key.length > 0) {
                        $parentForm.addClass("expanded");
                        var q_follow = "product",
                            str = "";
                        str = "/search?type=product&q=" + encodeURIComponent(key);
                        $.ajax({
                            // lấy tổng số trang của kết quả filter
                            url: str + "&view=mini-pagesize",
                            async: false,
                            success: function (data) {
                                data = JSON.parse(data);
                                total_search_page = parseInt(data.pages);
                                total_search_prod = parseInt(data.products);
                            },
                        });

                        if (current_search_page <= total_search_page) {
                            $.ajax({
                                url: str + "&view=mini-data",
                                type: "GET",
                                async: true,
                                success: function (data) {
                                    $(".ajloading").hide();
                                    $resultsData.parent().addClass("resultsdata");
                                    $resultsData.html(data);
                                    HRT.All.checkCart();
                                    if (productReviewsApp && productReviewsProloop) {
                                        ProductReviews.init();
                                    }
                                    if (total_search_page > 1) {
                                        $resultsData.parent().find(".results-morelink").show();
                                        $resultsData
                                            .parent()
                                            .find(".results-morelink .btn-morelink")
                                            .attr("data-page", current_search_page + 1);
                                        $resultsData
                                            .parent()
                                            .find(".results-morelink .btn-morelink")
                                            .find("b")
                                            .html(total_search_prod - current_search_page * limit);
                                    } else {
                                        $resultsData.parent().find(".results-morelink").hide();
                                    }
                                },
                            });
                        } else {
                            setTimeout(function () {
                                $(".ajloading").hide();
                                $resultsData.html(
                                    '<div class="product-empty"><div class="text-left">Không tìm thấy kết quả. Vui lòng thử lại!</div></div>'
                                );
                                $resultsData.parent().find(".results-morelink").hide();
                                $resultsData.parent().addClass("resultsdata");
                            }, 300);
                        }
                    } else {
                        setTimeout(function () {
                            $(".ajloading").hide();
                            $('.searchform-market input[type="text"]').val("");
                            $parentForm.removeClass("expanded");
                            $resultsData.html("");
                            $resultsData.parent().find(".results-morelink").hide();
                            $resultsData.parent().removeClass("resultsdata");
                            setTimeout(function () {
                                HRT.All.fixHeightProduct(
                                    ".section-market-collection .section-collection.active  .listProduct-row",
                                    ".product-resize",
                                    ".image-resize"
                                );
                            }, 200);
                        }, 300);
                    }
                }
            }, 700)
        );
        $(document).on(
            "click",
            ".section-market-results .results-morelink .btn-morelink",
            function (e) {
                e.preventDefault();
                var current_page = parseInt($(this).attr("data-page"));
                var str_query =
                    "/search?type=product&q=" +
                    encodeURIComponent($('.searchform-market input[type="text"]').val());
                $(".ajloading").show();
                jQuery.ajax({
                    url: str_query + "&view=mini-data&page=" + current_page,
                    success: function (data) {
                        setTimeout(function () {
                            $(".ajloading").hide();
                            $resultsData.append(data);
                            HRT.All.checkCart();
                            if (productReviewsApp && productReviewsProloop) {
                                ProductReviews.init();
                            }
                            if (current_page >= total_search_page && total_search_page > 1) {
                                $resultsData.parent().find(".results-morelink").hide();
                            } else {
                                $resultsData
                                    .parent()
                                    .find(".results-morelink .btn-morelink")
                                    .attr("data-page", current_page + 1);
                                $resultsData
                                    .parent()
                                    .find(".results-morelink .btn-morelink")
                                    .find("b")
                                    .html(total_search_prod - current_page * limit);
                                $resultsData.parent().find(".results-morelink").show();
                            }
                        }, 300);
                    },
                });
            }
        );
        $(document).on("click", ".searchform-market .search-close", function (e) {
            e.preventDefault();
            $(".searchform-market").removeClass("expanded");
            $(".searchform-market").find("input[name=q]").val("");
            $resultsData.html("");
            $resultsData.parent().find(".results-morelink").hide();
            $resultsData.parent().removeClass("resultsdata");
            setTimeout(function () {
                HRT.All.fixHeightProduct(
                    ".section-market-collection .section-collection.active  .listProduct-row",
                    ".product-resize",
                    ".image-resize"
                );
            }, 200);
        });
        $(document).on("click", ".searchform-market .search-btn", function () {
            $('.searchform-market input[type="text"]').focus();
        });
    },
    clickCategoryMini: function () {
        var limit = limitPaginate;
        var total_page = 0; //Tổng trang
        var total_prod = 0; //Tổng sản phẩm của 1 nhóm
        var isloading = false;
        var html_loadmore =
            '<a class="button dark btn-loadmore" href="javascript:void(0);">Xem thêm sản phẩm</a>';
        var currentHandle = $("#listMenu-mini .menu-item.active")
            .children("a")
            .attr("data-handle");
        $("#listMenu-mini .menu-item a").on("click", function (e) {
            e.preventDefault();
            $(".searchform-market .search-close").click();
            var indexCate = Number($(this).parent().attr("data-index"));
            var handle = jQuery(this).attr("data-handle");
            $("#listMenu-mini .menu-item").removeClass("active");
            $(".section-collection").removeClass("active");
            $(this).parent().addClass("active");
            $(
                '.section-collection[data-section="market-collection-' +
                indexCate +
                '"]'
            ).addClass("active");
            var indexTab = jQuery(".section-collection.active").index();
            if (
                $(".section-collection.active .wraplist-products .product-loop")
                    .length == 0
            ) {
                if (handle == "") {
                    jQuery(
                        ".section-collection.active .wraplist-morelink .btn-morelink"
                    ).html("");
                    setTimeout(function () {
                        $(".ajloading").hide();
                        jQuery(".section-collection.active")
                            .find(".wraplist-products")
                            .html(
                                '<div class="product-empty"><div class="text-left">Chưa có sản phẩm trong nhóm</div></div>'
                            );
                    }, 350);
                } else {
                    currentHandle = handle;
                    if (HRT.CollectionMini.totalPag[indexTab] == null) {
                        var cur_page = HRT.CollectionMini.currentPag[indexTab];
                        jQuery(
                            "#collection-tabs-ajax .tab-pane.active .collection-loadmore"
                        ).html(html_loadmore);
                        jQuery(".section-collection.active .wraplist-morelink").hide();
                        $(".ajloading").show();
                        jQuery.ajax({
                            // lấy tổng số trang của kết quả filter
                            url: currentHandle + "?view=mini-pagesize",
                            async: false,
                            success: function (data) {
                                data = JSON.parse(data);
                                HRT.CollectionMini.totalPag[indexTab] = parseInt(data.page);
                                total_page = HRT.CollectionMini.totalPag[indexTab];
                                HRT.CollectionMini.totalProd[indexTab] = parseInt(
                                    data.products
                                );
                                total_prod = HRT.CollectionMini.totalProd[indexTab];
                            },
                        });

                        jQuery.ajax({
                            url: currentHandle + "?view=mini-data&page=1",
                            success: function (data) {
                                setTimeout(function () {
                                    $(".ajloading").hide();
                                    jQuery(".section-collection.active")
                                        .attr("data-get", "true")
                                        .find(".wraplist-products")
                                        .html(data);
                                    if (productReviewsApp && productReviewsProloop) {
                                        ProductReviews.init();
                                    }
                                    HRT.All.checkCart();
                                    if (total_page > 0) {
                                        if (cur_page == total_page) {
                                            jQuery(
                                                ".section-collection.active .wraplist-morelink"
                                            ).hide();
                                        } else {
                                            jQuery(".section-collection.active .wraplist-morelink")
                                                .find("b")
                                                .html(total_prod - cur_page * limit);
                                            jQuery(
                                                ".section-collection.active .wraplist-morelink"
                                            ).show();
                                        }
                                    } else {
                                        jQuery(
                                            ".section-collection.active .wraplist-morelink"
                                        ).hide();
                                    }
                                    setTimeout(function () {
                                        jQuery(window).resize();
                                    }, 300);
                                }, 150);
                            },
                        });
                    }
                }
            } else {
                $(".ajloading").hide();
            }
        });
        $(document).on(
            "click",
            ".wraplist-morelink .btn-morelink",
            function (event) {
                event.preventDefault();
                var self = $(this);
                var indexTab = jQuery(".section-collection.active").index();
                var cur_page = HRT.CollectionMini.currentPag[indexTab];
                currentHandle = $(this).attr("data-collectionhd");
                if (HRT.CollectionMini.totalPag[indexTab] == null) {
                    jQuery.ajax({
                        // lấy tổng số trang của kết quả filter
                        url: currentHandle + "?view=mini-pagesize",
                        async: false,
                        success: function (data) {
                            data = JSON.parse(data);
                            HRT.CollectionMini.totalPag[indexTab] = parseInt(data.page);
                            total_page = HRT.CollectionMini.totalPag[indexTab];
                            HRT.CollectionMini.totalProd[indexTab] = parseInt(data.products);
                            total_prod = HRT.CollectionMini.totalProd[indexTab];
                        },
                    });
                } else {
                    total_page = HRT.CollectionMini.totalPag[indexTab];
                    total_prod = HRT.CollectionMini.totalProd[indexTab];
                }

                if (!isloading && cur_page < total_page) {
                    $(".ajloading").show();
                    isloading = true;
                    cur_page++;
                    HRT.CollectionMini.currentPag[indexTab] = cur_page;
                    jQuery.ajax({
                        url: currentHandle + "?view=mini-data&page=" + cur_page,
                        success: function (data) {
                            setTimeout(function () {
                                jQuery(".section-collection.active")
                                    .find(".wraplist-products")
                                    .append(data);
                                if (productReviewsApp && productReviewsProloop) {
                                    ProductReviews.init();
                                }
                                HRT.All.checkCart();
                                isloading = false;
                                $(".ajloading").hide();
                                if (total_page > 0) {
                                    if (cur_page == total_page) {
                                        self.hide();
                                    } else {
                                        self.attr("data-page", cur_page + 1);
                                        self.find("b").html(total_prod - cur_page * limit);
                                        self.show();
                                    }
                                } else {
                                    jQuery(
                                        ".section-collection.active .wraplist-morelink"
                                    ).hide();
                                }
                            }, 400);
                        },
                    });
                } else {
                    isloading = false;
                    $(".ajloading").hide();
                    jQuery(".section-collection.active .wraplist-morelink").hide();
                }
            }
        );
    },
    fixHeightMini: function () {
        $(document).on("lazyloaded", function (e) {
            HRT.All.fixHeightProduct(
                ".section-market-collection .section-collection.active  .listProduct-row",
                ".product-resize",
                ".image-resize"
            );
            HRT.All.fixHeightProduct(
                ".section-market-results.resultsdata .listProduct-row",
                ".product-resize",
                ".image-resize"
            );
        });
    },
};

var nCount = 0;
$(".section-ldpage01-collection").each(function () {
    nCount += $(this).find(".nav-tabs li").length;
});

HRT.Ldpage01 = {
    currentPag: Array(nCount).fill(1),
    totalPag: [],
    init: function () {
        this.ajaxCollectionFlashSale();
        this.countdownFlashSale();
        this.copyCodeFlashSale();
        this.popoverCoupon();
        this.fixHeightFlashSale();
    },
    scrollCenterFlashSale: function (parent, elem, speed) {
        var active = jQuery(parent).find(elem);
        var activeWidth = active.width() / 2;
        var pos = jQuery(parent).find(elem).position().left + activeWidth;
        var elpos = jQuery(parent).scrollLeft();
        var elW = jQuery(parent).width();
        pos = pos + elpos - elW / 2;
        jQuery(parent).animate(
            {
                scrollLeft: pos,
            },
            speed == undefined ? 1000 : speed
        );
        return this;
    },
    ajaxCollectionFlashSale: function () {
        var total_page = 0; //Tổng trang
        var isloading = false;
        var html_loadmore =
            '<a class="btn-loadmore" href="javascript:void(0);">Xem thêm sản phẩm</a>';

        $(".section-ldpage01-collection").each(function () {
            var currentHandle = $(this).find("li.active a").attr("data-handle");
            var sectionCurrent = $(this);

            $(this)
                .find('.collection-navtabs-title li a[data-toggle="tab"]')
                .on("shown.bs.tab", function (event) {
                    var handle = $(this).attr("data-handle");
                    var indexTab = Number(
                        $(this).attr("href").replace("#collection-tabs-", "")
                    );
                    //sectionCurrent.find(".collection-navtabs-title li a[data-handle!='" + handle + "']").parent().removeClass("active");
                    //sectionCurrent.find(".collection-navtabs-title li a[data-handle='" + handle + "']").parent().addClass("active");
                    if (jQuery(window).width() < 768) {
                        var $parentScroll = sectionCurrent.find(
                            ".collection-navtabs-title"
                        );
                        HRT.Ldpage01.scrollCenterFlashSale($parentScroll, ".active", 500);
                    }
                    sectionCurrent
                        .find(".tab-pane.active .icon-loading.tab-index")
                        .show();
                    if (
                        sectionCurrent.find(
                            ".tab-pane.active .collection-listprod .product-loop-ldpage"
                        ).length == 0
                    ) {
                        if (handle == "") {
                            jQuery.ajax({
                                url: "/collections/all?view=ldpage01-noproduct",
                                success: function (data) {
                                    sectionCurrent
                                        .find(".tab-pane.active .icon-loading.tab-index")
                                        .hide();
                                    setTimeout(function () {
                                        sectionCurrent
                                            .find(".tab-pane.active .collection-loadmore")
                                            .html("");
                                        sectionCurrent
                                            .find(".tab-pane.active")
                                            .attr("data-get", "true")
                                            .find(".collection-listprod")
                                            .html(data);

                                        setTimeout(function () {
                                            jQuery(window).resize();
                                        }, 400);
                                    }, 200);
                                },
                            });
                            HRT.Ldpage01.totalPag[indexTab - 1] = null;
                            HRT.Ldpage01.currentPag[indexTab - 1] = null;
                        } else {
                            currentHandle = handle;
                            if (HRT.Ldpage01.totalPag[indexTab - 1] == null) {
                                var cur_page = 1;
                                HRT.Ldpage01.currentPag[indexTab - 1] = 1;
                                sectionCurrent
                                    .find(
                                        ".tabslist-product-content .tab-pane.active .collection-loadmore"
                                    )
                                    .html(html_loadmore);
                                jQuery.ajax({
                                    // lấy tổng số trang của kết quả filter
                                    url: currentHandle + "?view=ldpage01-pagesize",
                                    async: false,
                                    success: function (data) {
                                        HRT.Ldpage01.totalPag[indexTab - 1] = parseInt(data);
                                        total_page = HRT.Ldpage01.totalPag[indexTab - 1];
                                    },
                                });
                                jQuery.ajax({
                                    url: currentHandle + "?view=ldpage01-data&page=1",
                                    success: function (data) {
                                        sectionCurrent.find(".icon-loading.tab-index").hide();
                                        setTimeout(function () {
                                            sectionCurrent
                                                .find(".tabslist-product-content .tab-pane.active")
                                                .attr("data-get", "true")
                                                .find(".collection-listprod")
                                                .html(data);
                                            HRT.All.checkCart();
                                            if (total_page > 1) {
                                                if (cur_page == total_page) {
                                                    sectionCurrent
                                                        .find(".tab-pane.active .collection-loadmore")
                                                        .html("");
                                                } else {
                                                    sectionCurrent
                                                        .find(".tab-pane.active .collection-loadmore")
                                                        .html(html_loadmore);
                                                }
                                            } else {
                                                sectionCurrent
                                                    .find(".tab-pane.active .collection-loadmore")
                                                    .html("");
                                            }
                                            if (productReviewsApp && productReviewsProloop) {
                                                ProductReviews.init();
                                            }
                                            setTimeout(function () {
                                                jQuery(window).resize();
                                            }, 400);
                                        }, 200);
                                    },
                                });
                            }
                        }
                    }
                });
        });

        $(document).on(
            "click",
            ".collection-loadmore .btn-loadmore",
            function (event) {
                event.preventDefault();
                var btn = $(this);
                var idTab = $(this).parents(".tab-pane").attr("id");
                var indexTab =
                    Number(
                        $(this)
                            .parents(".tab-pane")
                            .attr("id")
                            .replace("collection-tabs-", "")
                    ) - 1;
                var cur_page = HRT.Ldpage01.currentPag[indexTab];
                currentHandle = $(
                    '.collection-navtabs-title a[href="#' + idTab + '"]'
                ).attr("data-handle");
                if (
                    HRT.Ldpage01.totalPag[indexTab] == null ||
                    HRT.Ldpage01.totalPag.length == 0
                ) {
                    jQuery.ajax({
                        // lấy tổng số trang của kết quả filter
                        url: currentHandle + "?view=ldpage01-pagesize",
                        async: false,
                        success: function (data) {
                            HRT.Ldpage01.totalPag[indexTab] = parseInt(data);
                            total_page = HRT.Ldpage01.totalPag[indexTab];
                        },
                    });
                } else {
                    total_page = HRT.Ldpage01.totalPag[indexTab];
                }
                cur_page++;
                HRT.Ldpage01.currentPag[indexTab] = cur_page;

                if (!isloading && cur_page <= total_page) {
                    $(this)
                        .parents(".collection-loadmore")
                        .html(
                            '<a class="btn-loadmore btn-loading" href="javascript:void(0);">Xem thêm sản phẩm...</a>'
                        );
                    isloading = true;
                    jQuery.ajax({
                        url: currentHandle + "?view=ldpage01-data&page=" + cur_page,
                        success: function (data) {
                            setTimeout(function () {
                                $("#" + idTab)
                                    .find(".collection-listprod")
                                    .append(data);
                                if (productReviewsApp && productReviewsProloop) {
                                    ProductReviews.init();
                                }
                                isloading = false;
                                if (total_page > 0) {
                                    if (cur_page == total_page) {
                                        $("#" + idTab)
                                            .find(".collection-loadmore")
                                            .html("");
                                    } else {
                                        $("#" + idTab)
                                            .find(".collection-loadmore")
                                            .html(html_loadmore);
                                    }
                                } else {
                                    $("#" + idTab)
                                        .find(".collection-loadmore")
                                        .html("");
                                }
                            }, 500);
                        },
                    });
                } else {
                    isloading = false;
                    $("#" + idTab)
                        .find(".collection-loadmore")
                        .html("");
                }
            }
        );
    },
    countdownFlashSale: function () {
        if ($(".flip-js-countdown").length > 0) {
            var element = document.getElementById("soon-espa");
            var time_start = $(".flip-js-countdown .auto-due").attr("data-start");
            var time_end = $(".flip-js-countdown .auto-due").attr("data-end");
            var beforeRun = new Date(time_start);
            beforeRun = beforeRun.getTime();
            var afterRun = new Date(time_end);
            afterRun = afterRun.getTime();
            var now = new Date();
            now = now.getTime();

            function tick(milliseconds, beforeRun) {
                if (milliseconds == 0) {
                    $("#label-due").html("Ưu đãi kết thúc").removeClass("hidden");
                } else {
                    $("#label-due").html("Sắp diễn ra:").removeClass("hidden");
                }
            }

            function tick2(milliseconds, afterRun) {
                if (milliseconds == 0) {
                    $("#label-due").html("Ưu đãi kết thúc").removeClass("hidden");
                } else {
                    $("#label-due").html("Kết thúc sau:").removeClass("hidden");
                }
            }

            function complete() {
                var today = new Date();
                var cdate = today.getTime();
                if (cdate < afterRun) {
                    Soon.destroy(element);
                    Soon.create(element, {
                        due: time_end,
                        now: null,
                        layout: "group label-small",
                        face: "flip color-light",
                        format: "d,h,m,s",
                        labelsYears: null,
                        labelsDays: "Ngày",
                        labelsHours: "Giờ",
                        labelsMinutes: "Phút",
                        labelsSeconds: "Giây",
                        separateChars: false,
                        scaleMax: "l",
                        separator: "",
                        singular: true,
                        paddingDays: "00",
                        eventTick: tick2,
                        eventComplete: function () {
                            //$('.tabslist-product-countdown').hide();
                        },
                    });
                }
            }

            /*if(now < afterRun){}*/
            Soon.create(element, {
                due: time_start,
                now: null,
                layout: "group label-small",
                face: "flip color-light",
                format: "d,h,m,s",
                labelsYears: null,
                labelsDays: "Ngày",
                labelsHours: "Giờ",
                labelsMinutes: "Phút",
                labelsSeconds: "Giây",
                separateChars: false,
                scaleMax: "l",
                separator: "",
                paddingDays: "00",
                singular: true,
                eventTick: tick,
                eventComplete: complete,
            });
        }
    },
    popoverCoupon: function () {
        var popover = '.cpi-tooltip .cpi-tooltip__dot[data-toggle="popover"]';

        $(popover).popover({
            html: true,
            animation: true,
            placement: function (popover, trigger) {
                var placement = jQuery(trigger).attr("data-placement");
                var dataClass = jQuery(trigger).attr("data-class");
                jQuery(trigger).addClass("is-active");
                jQuery(popover).addClass(dataClass);
                if (jQuery(trigger).offset().top - $(window).scrollTop() > 280) {
                    return "top";
                }
                return placement;
            },
            content: function () {
                var elementId = $(this).attr("data-popover-content");
                return $(elementId).html();
            },
            delay: {show: 100, hide: 50},
        });
        $(popover)
            .popover()
            .on("hide.bs.popover", function () {
                $(".modal-coupon--backdrop").removeClass("js-modal-show");
            });
        $(popover)
            .popover()
            .on("show.bs.popover", function () {
                $(".modal-coupon--backdrop").addClass("js-modal-show");
            });
        $("body").on("hidden.bs.popover", function (e) {
            $(e.target).data("bs.popover").inState = {
                click: false,
                hover: false,
                focus: false,
            };
        });
        $(document).on(
            "click",
            ".popover-content__coupon .btn-popover-close,.modal-coupon--backdrop",
            function (e) {
                $(popover).popover("hide");
            }
        );

        function eventPopover() {
            if ($(window).width() >= 768) {
                $(popover)
                    .on("mouseenter", function () {
                        var self = this;
                        jQuery(this).popover("show");
                        jQuery(".popover.coupon-popover").on("mouseleave", function () {
                            jQuery(self).popover("hide");
                        });
                    })
                    .on("mouseleave", function () {
                        var self = this;
                        setTimeout(function () {
                            if (!jQuery(".popover.coupon-popover:hover").length) {
                                jQuery(self).popover("hide");
                            }
                        }, 300);
                    });
            } else {
                $(popover).off("mouseenter mouseleave");
            }
        }

        eventPopover();
        $(window).resize(function () {
            eventPopover();
        });
    },
    copyCodeFlashSale: function () {
        $(document).on("click", ".coupon-item .cpi-button", function (e) {
            e.preventDefault();
            $(".coupon-item .cpi-button").html("Sao chép mã").removeClass("disabled");
            var copyText = $(this).attr("data-coupon");
            var el = document.createElement("textarea");
            el.value = copyText;
            el.setAttribute("readonly", "");
            el.style.position = "absolute";
            el.style.left = "-9999px";
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
            $(this).html("Đã sao chép").addClass("disabled");
        });
        $(document).on(
            "click",
            ".popover-content__coupon .btn-popover-code",
            function (e) {
                e.preventDefault();
                var btnPopover = $(this).attr("data-coupon");
                $(".coupon-item .cpi-button[data-coupon=" + btnPopover + "]").click();
                $(this).html("Đã sao chép").addClass("disabled");
            }
        );
    },
    fixHeightFlashSale: function () {
        var windowWidth = $(window).outerWidth();
        $(document).on("lazyloaded", function (e) {
            HRT.All.fixHeightProduct(
                ".section-food01-bestseller .tab-pane.active .collection-listprod",
                ".product-resize",
                ".image-resize"
            );
            HRT.All.fixHeightProduct(
                ".section-food01-hotproduct .tab-pane.active .collection-listprod",
                ".product-resize",
                ".image-resize"
            );
        });
    },
};

jQuery(document).ready(function () {
    HRT.All.checkCart();
    HRT.init();

    if (window.template.indexOf("page.about-03") > -1) {
        if ($(".about-us-carousel").length > 0) {
            $(".about-us-carousel").owlCarousel({
                loop: true,
                autoplay: false,
                autoplayTimeout: 3000,
                margin: 15,
                nav: true,
                navText: [
                    '<i class="fa fa-angle-left"></i>',
                    '<i class="fa fa-angle-right"></i>',
                ],
                items: 1,
                animateOut: "fadeOut",
                dots: false,
                lazyLoad: false,
            });
        }
        if (jQuery(window).width() > 991) {
            jQuery(
                '.wrapper-services-outer[data-toggle="tab-hover"] .service-loop'
            ).on("mouseenter", function () {
                jQuery(this).tab("show");
            });
        }
    }

    $(".header-action_search .header-action__link").click(function (e) {
        e.preventDefault();
        if ($(this).parents(".header-wrap-action").hasClass("show-search")) {
            $(this).parents(".mainHeader-middle").removeClass("header-is-search");
            $(this).parents(".mainHeader-middle").find(".header-wrap-search").hide();
            $(this).parents(".header-wrap-action").removeClass("show-search");
            $("body").removeClass("noscroll");
        } else {
            $(this)
                .parents(".mainHeader-middle")
                .find(".header-wrap-search")
                .fadeIn(100);
            $(this).parents(".mainHeader-middle").addClass("header-is-search");
            $(this).parents(".header-wrap-action").addClass("show-search");
            $("body").addClass("noscroll");
            setTimeout(function () {
                //	$('.mainHeader-middle .header-wrap-search .input-search').trigger("focus");
                //$('.mainHeader-middle .header-wrap-search .input-search').trigger("tap");
                //	$('.mainHeader-middle .header-wrap-search .input-search').trigger("focus");
                $(".mainHeader-middle .header-wrap-search .input-search").trigger(
                    "click"
                );
            }, 200);
        }
    });
});
