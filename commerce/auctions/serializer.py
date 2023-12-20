from rest_framework import serializers
from .models import auction, bids, Comments, sold, Category
from django.contrib.auth.models import User



class AuctionListSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='get_category_display')
    class Meta:
        model = auction
        fields=('id','title','price','category','image')

class AuctionSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='get_category_display')
    comments = serializers.SerializerMethodField()
    seller = serializers.SerializerMethodField()
    watchlist = serializers.SerializerMethodField()
    class Meta:
        model = auction
        fields = ('id', 'title', 'description', 'seller','price', 'category', 'image', 'comments', 'watchlist')
    def get_watchlist(self, obj):
        request = self.context.get('request')
        user = request.user
        return user in obj.watchlist.all()
    def get_seller(self, obj):
        return obj.seller.username
    def get_comments(self, obj):
        comments = Comments.objects.filter(iten=obj).order_by('-created_at')
        return  [comment.serializer() for comment in comments]


class soldSerializer(serializers.ModelSerializer):
    buyer = serializers.SerializerMethodField()
    seller = serializers.SerializerMethodField()
    is_sold = serializers.BooleanField(default=True)
    class Meta:
        model = sold
        fields = ('auction_id', 'auction_title', 'buyer', 'seller', 'value', 'is_sold')
    def get_buyer(self, obj):
        return obj.buyer.username
    def get_seller(self, obj):
        return obj.seller.username


  