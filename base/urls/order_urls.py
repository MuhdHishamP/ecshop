from django.urls import path
from ..views import order_views as views


urlpatterns = [
    path("add/", views.addOrderItems, name="orders_add"),
    path("myorders/", views.getMyOrders, name="my_orders"),
    path("<str:pk>/", views.getOrderbyId, name="user_order"),
    path("<str:pk>/pay/", views.updateOrdertoPaid, name="paid"),
]
