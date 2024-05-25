from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from ..serializers import ProductSerializer
from ..models import Product, Review


@api_view(["GET"])
def getProducts(request):
    query = request.query_params.get("keyword", "")
    products = Product.objects.filter(name__icontains=query)
    serializer = ProductSerializer(products, many=True)
    return Response({"products": serializer.data})


@api_view(["GET"])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by("-rating")[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content = {"detail": "You have already reviewed this product"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    elif data["rating"] == 0:
        content = {"detail": "Please provide a valid rating"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    else:
        Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data["rating"],
            comment=data["comment"],
        )
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        totalRating = 0

        for i in reviews:
            totalRating += i.rating

        product.rating = totalRating / len(reviews)
        product.save()

        return Response("Review Added", status=status.HTTP_201_CREATED)
