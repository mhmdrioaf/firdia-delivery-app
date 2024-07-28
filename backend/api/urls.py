from django.urls import include, path

from .views import ProductListCreateView, UserRegisterView, ProductDeleteView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('products/', ProductListCreateView.as_view(), name="product_list"),
    path('products/delete/<int:pk>', ProductDeleteView.as_view(), name="product_delete"),
    path('user/register/', UserRegisterView.as_view(), name="user_register"),
    path('token/', TokenObtainPairView.as_view(), name="get_token"),
    path('token/refresh', TokenRefreshView.as_view(), name="token_refresh"),
    path('auth/', include('rest_framework.urls'))
]
