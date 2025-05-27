package sv.edu.udb.panventury_service.service;

import sv.edu.udb.panventury_service.model.Pedido;

import java.util.List;

public interface PedidoService {
    List<Pedido> findAll();
    Pedido findById(Long id);
    Pedido save(Pedido pedido);
}
