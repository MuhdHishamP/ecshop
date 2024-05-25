from django.urls import path
from ..views import product_views as views


urlpatterns = [
    path("", views.getProducts, name="get_Products"),
    path("top/", views.getTopProducts, name="get_top_products"),
    path("<str:pk>/", views.getProduct, name="get_Product"),
    path("<str:pk>/reviews/", views.createProductReview, name="create_review"),
]
