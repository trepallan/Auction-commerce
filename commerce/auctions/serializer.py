from rest_framework import serializers
from .models import auction, bids, Comments, sold, Category

class AuctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = auction
        fields='__all__'

class AidsSerializer(serializers.ModelSerializer):
    class Meta:
        model = bids
        fields='__all__'

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields='__all__'

class SoldSerializer(serializers.ModelSerializer):
    class Meta:
        model = sold
        fields='__all__'